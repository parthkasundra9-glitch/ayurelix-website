import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderId, total, shippingDetails, items, email } = req.body;

  if (!orderId || !total || !shippingDetails || !items || !email) {
    return res.status(400).json({ error: "Required order details are missing." });
  }

  // Retrieve API Keys from Environment Variables
  const shiprocketEmail = process.env.SHIPROCKET_EMAIL;
  const shiprocketPassword = process.env.SHIPROCKET_PASSWORD;
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://bxoiqighjsdwjltqmeci.supabase.co";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!shiprocketEmail || !shiprocketPassword) {
    console.error("Missing Shiprocket credentials.");
    return res.status(500).json({ error: "Shiprocket credentials are not configured on server." });
  }

  if (!supabaseServiceKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY.");
    return res.status(500).json({ error: "Database authentication is not configured on server." });
  }

  try {
    // 1. Authenticate with Shiprocket API
    const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: shiprocketEmail,
        password: shiprocketPassword
      })
    });

    if (!authRes.ok) {
      const authErr = await authRes.json();
      throw new Error(`Shiprocket auth failed: ${authErr.message || authRes.statusText}`);
    }

    const { token } = await authRes.json();

    // 2. Create Order in Shiprocket
    const orderDateFormatted = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false
    }).replace(/,/g, "").slice(0, 16); // format: YYYY-MM-DD HH:mm or DD/MM/YYYY HH:mm

    const shiprocketOrderPayload = {
      order_id: orderId,
      order_date: orderDateFormatted,
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
      billing_customer_name: shippingDetails.fullName,
      billing_last_name: "",
      billing_address: shippingDetails.address,
      billing_city: shippingDetails.city,
      billing_pincode: shippingDetails.postalCode,
      billing_state: shippingDetails.state,
      billing_country: "India",
      billing_email: email,
      billing_phone: shippingDetails.phone,
      shipping_is_billing: true,
      order_items: items.map((item) => ({
        name: item.name || "Premium Ayurvedic Product",
        sku: String(item.id),
        units: item.quantity,
        selling_price: item.price,
        discount: 0,
        tax: 0,
        hsn: 0
      })),
      payment_method: "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_delay: 0,
      sub_total: total,
      length: 15,     // 15 cm
      width: 8,       // 8 cm (breadth)
      height: 8,      // 8 cm
      weight: 0.05    // 0.05 kg (50 grams dead weight)
    };

    const orderRes = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(shiprocketOrderPayload)
    });

    if (!orderRes.ok) {
      const orderErr = await orderRes.json();
      throw new Error(`Shiprocket order creation failed: ${orderErr.message || orderRes.statusText}`);
    }

    const orderResult = await orderRes.json();
    const { order_id: shiprocketOrderId, shipment_id: shipmentId } = orderResult;

    // 3. Initialize Supabase Admin client and save details back
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch existing order shipping details to merge
    const { data: currentOrder, error: fetchErr } = await supabase
      .from("orders")
      .select("shipping_address")
      .eq("id", orderId)
      .single();

    if (fetchErr) throw fetchErr;

    const updatedShippingAddress = {
      ...currentOrder.shipping_address,
      shipment_id: shipmentId,
      shiprocket_order_id: shiprocketOrderId,
      awb_code: "" // Initializing as empty string; tracking can be updated later or checked in panel
    };

    const { error: updateErr } = await supabase
      .from("orders")
      .update({ shipping_address: updatedShippingAddress })
      .eq("id", orderId);

    if (updateErr) throw updateErr;

    return res.status(200).json({
      success: true,
      shipmentId,
      shiprocketOrderId
    });

  } catch (error) {
    console.error("API error during shipment creation:", error);
    return res.status(500).json({
      error: "Internal server error during shipping partner generation: " + error.message
    });
  }
}
