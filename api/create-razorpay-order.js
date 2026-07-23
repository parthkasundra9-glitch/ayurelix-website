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

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount parameter is required." });
  }

  const keyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  // If using mock fallback, skip actual API call
  if (!keyId || keyId === "rzp_test_fallback_key" || !keySecret) {
    return res.status(200).json({
      success: true,
      orderId: "order_simulated_" + Math.random().toString(36).substr(2, 9),
      isSimulated: true
    });
  }

  const amountInPaisa = Math.round(Number(amount) * 100);

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(keyId + ":" + keySecret).toString("base64")
      },
      body: JSON.stringify({
        amount: amountInPaisa,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.description || "Failed to create Razorpay order");
    }

    return res.status(200).json({
      success: true,
      orderId: data.id,
      isSimulated: false
    });
  } catch (error) {
    console.error("Razorpay order API error:", error);
    return res.status(500).json({ error: "Failed to generate payment gateway order: " + error.message });
  }
}
