import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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

  const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://bxoiqighjsdwjltqmeci.supabase.co";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    total,
    shippingDetails,
    items,
    isSimulated
  } = req.body;

  if (!razorpayPaymentId || !total || !shippingDetails || !items) {
    return res.status(400).json({ error: "Required verification payload is missing." });
  }

  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 2. Perform payment signature verification if not a simulated payment
    const checkSignature = !isSimulated && String(razorpayPaymentId).indexOf("simulated_") === -1;

    if (checkSignature) {
      if (!keySecret) {
        return res.status(500).json({ error: "Signature verification keys are missing on server." });
      }

      if (!razorpayOrderId || !razorpaySignature) {
        return res.status(400).json({ error: "Razorpay Order ID and Signature are required for verification." });
      }

      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        console.warn("Signature mismatch detected. Potential fraud attempt:", { razorpayOrderId, razorpayPaymentId });
        return res.status(400).json({ error: "Security validation failed. Payment signature is invalid." });
      }
    }

    // 3. Insert order record securely using Supabase client
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          total_amount: Number(total),
          status: "paid",
          payment_id: razorpayPaymentId,
          shipping_address: shippingDetails
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Insert order items
    const orderItemsData = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: Number(item.quantity),
      price: Number(item.price)
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsData);

    if (itemsError) throw itemsError;

    return res.status(200).json({
      success: true,
      orderId: order.id
    });

  } catch (error) {
    console.error("Payment verification failure:", error);
    return res.status(500).json({ error: "Internal payment processing error: " + error.message });
  }
}
