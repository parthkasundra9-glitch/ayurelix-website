import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Set dynamic CORS headers based on allowed origins list
  const allowedOrigins = [
    "https://www.ayurelix.com",
    "https://ayurelix.in",
    "https://ayurelix-website.vercel.app"
  ];
  const origin = req.headers.origin;

  res.setHeader("Access-Control-Allow-Credentials", true);
  if (allowedOrigins.includes(origin) || (process.env.NODE_ENV === "development" && origin?.startsWith("http://localhost"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://www.ayurelix.com");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. Verify User JWT Token authorization
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^bearer\s+/i, "").trim();

  if (!token) {
    return res.status(401).json({ error: "Authorization credentials are required." });
  }

  // Retrieve API Keys from environment
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

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Authenticate user session with Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Access denied. Invalid session token." });
  }

  const { orderId, total, shippingDetails, items, email } = req.body;

  if (!orderId || !total || !shippingDetails || !items || !email) {
    return res.status(400).json({ error: "Required order details are missing." });
  }

  try {
    // 2. Verify that the requested order exists and belongs to the authenticated user
    const { data: matchedOrder, error: orderLookupError } = await supabase
      .from("orders")
      .select("user_id")
      .eq("id", orderId)
      .single();

    if (orderLookupError || !matchedOrder || matchedOrder.user_id !== user.id) {
      return res.status(403).json({ error: "Access Forbidden. Order does not match user account." });
    }

    // 3. Authenticate with Shiprocket API
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

    const { token: shiprocketToken } = await authRes.json();

    // 4. Format Order Date in Asia/Kolkata timezone: YYYY-MM-DD HH:mm
    let orderDateFormatted = "";
    try {
      const dateOpts = { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false };
      const formatter = new Intl.DateTimeFormat("en-US", dateOpts);
      const parts = formatter.formatToParts(new Date());
      const partMap = {};
      parts.forEach(p => partMap[p.type] = p.value);
      orderDateFormatted = `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}`;
    } catch (dateErr) {
      console.warn("Failed to format date with Intl, using fallback:", dateErr);
      orderDateFormatted = new Date().toISOString().slice(0, 16).replace('T', ' ');
    }

    const phoneClean = shippingDetails.phone ? shippingDetails.phone.replace(/\D/g, "").slice(-10) : "";
    const pincodeClean = shippingDetails.postalCode ? shippingDetails.postalCode.replace(/\D/g, "") : "";
    const addressClean = shippingDetails.address ? shippingDetails.address.trim() : "";
    // Calculate subtotal and shipping charges
    const subTotalAmount = items.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
    const shippingFee = Number(total) - subTotalAmount > 0 ? Number(total) - subTotalAmount : 0;

    const shiprocketOrderPayload = {
      order_id: orderId,
      order_date: orderDateFormatted,
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
      billing_customer_name: shippingDetails.fullName || "Customer",
      billing_last_name: "",
      billing_address: addressClean.length < 6 ? `${addressClean} Street Address` : addressClean,
      billing_city: shippingDetails.city || "Ahmedabad",
      billing_pincode: pincodeClean,
      billing_state: shippingDetails.state || "Gujarat",
      billing_country: "India",
      billing_email: email,
      billing_phone: phoneClean,
      shipping_is_billing: true,
      order_items: items.map((item) => ({
        name: (item.name || "Ayurvedic Product").slice(0, 50),
        sku: String(item.id),
        units: Number(item.quantity) || 1,
        selling_price: Number(item.price) || 0,
        discount: 0,
        tax: 0,
        hsn: 0
      })),
      payment_method: "Prepaid",
      shipping_charges: shippingFee,
      giftwrap_charges: 0,
      transaction_delay: 0,
      sub_total: subTotalAmount,
      length: 15,     // 15 cm
      breadth: 8,      // 8 cm
      height: 8,      // 8 cm
      weight: 0.05    // 0.05 kg
    };

    const orderRes = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${shiprocketToken}`
      },
      body: JSON.stringify(shiprocketOrderPayload)
    });

    if (!orderRes.ok) {
      const orderErr = await orderRes.json();
      throw new Error(`Shiprocket order creation failed: ${orderErr.message || orderRes.statusText}`);
    }

    const orderResult = await orderRes.json();
    const { order_id: shiprocketOrderId, shipment_id: shipmentId } = orderResult;

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
      awb_code: ""
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
