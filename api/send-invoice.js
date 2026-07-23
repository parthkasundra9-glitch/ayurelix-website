import { createClient } from "@supabase/supabase-js";

function escapeHtml(string) {
  if (!string) return "";
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
    return res.status(500).json({ error: "Database authentication configuration is missing." });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Authenticate user token with Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Access denied. Invalid session token." });
  }

  const { orderId, total, shippingDetails, items, email } = req.body;

  if (!orderId || !total || !shippingDetails || !items || !email) {
    return res.status(400).json({ error: "Required order details are missing." });
  }

  // Verify that the requested order belongs to the authenticated user
  const { data: matchedOrder, error: orderLookupError } = await supabase
    .from("orders")
    .select("user_id")
    .eq("id", orderId)
    .single();

  if (orderLookupError || !matchedOrder || matchedOrder.user_id !== user.id) {
    return res.status(403).json({ error: "Access Forbidden. Order does not match user account." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return res.status(500).json({
      error: "Email service is currently unconfigured. Please configure the RESEND_API_KEY environment variable."
    });
  }

  const orderDateFormatted = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short"
  });

  const subTotalAmount = items.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const shippingFee = Number(total) - subTotalAmount > 0 ? Number(total) - subTotalAmount : 0;

  const itemsRowsHtml = items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid rgba(26, 43, 73, 0.05); color: #1A2B49; font-weight: 600;">
        ${escapeHtml(item.name) || "Premium Ayurvedic Product"}
        <span style="display: block; font-size: 11px; color: #6b7280; font-weight: 500; margin-top: 2px;">Qty: ${Number(item.quantity)}</span>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid rgba(26, 43, 73, 0.05); text-align: right; color: #1A2B49; font-weight: 700;">
        ₹${Number(item.price) * Number(item.quantity)}
      </td>
    </tr>
  `).join("");

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Your Ayurelix Order Invoice</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #FAF8F5;
        color: #1A2B49;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid rgba(26, 43, 73, 0.1);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(26, 43, 73, 0.05);
      }
      .header {
        background-color: #1A2B49;
        padding: 30px;
        text-align: center;
        border-bottom: 3px solid #B89355;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 26px;
        font-weight: 800;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
      .header p {
        color: #B89355;
        margin: 6px 0 0 0;
        font-size: 10px;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        font-weight: 700;
      }
      .content {
        padding: 35px;
      }
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 10px;
        color: #1A2B49;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .subtitle {
        font-size: 12px;
        color: #B89355;
        text-align: center;
        margin-bottom: 30px;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .meta-box {
        background-color: #FAF8F5;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 25px;
        border: 1px solid rgba(26, 43, 73, 0.03);
      }
      .meta-table {
        width: 100%;
        font-size: 13px;
        border-collapse: collapse;
      }
      .meta-table td {
        padding: 4px 0;
      }
      .meta-label {
        color: #6b7280;
        font-weight: 600;
        width: 120px;
      }
      .meta-value {
        color: #1A2B49;
        font-weight: 700;
        font-family: monospace;
      }
      .invoice-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 25px;
        font-size: 13px;
      }
      .invoice-table th {
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(26, 43, 73, 0.1);
        text-align: left;
        color: #B89355;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 0.05em;
      }
      .summary-table {
        width: 100%;
        margin-top: 15px;
        font-size: 13px;
      }
      .summary-table td {
        padding: 6px 0;
      }
      .summary-total {
        font-size: 16px;
        color: #B89355;
        font-weight: 800;
        border-top: 2px solid rgba(26, 43, 73, 0.1);
        padding-top: 12px;
      }
      .address-box {
        border-top: 1px dashed rgba(26, 43, 73, 0.15);
        padding-top: 25px;
        margin-top: 25px;
      }
      .address-title {
        font-size: 12px;
        font-weight: 700;
        color: #B89355;
        text-transform: uppercase;
        margin-bottom: 10px;
        letter-spacing: 0.05em;
      }
      .address-details {
        font-size: 13px;
        line-height: 1.6;
        color: #4b5563;
      }
      .footer {
        background-color: #FAF8F5;
        padding: 25px;
        text-align: center;
        font-size: 11px;
        color: #6b7280;
        border-top: 1px solid rgba(26, 43, 73, 0.05);
        font-weight: 600;
      }
      .footer a {
        color: #B89355;
        text-decoration: none;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Ayurelix</h1>
        <p>Elixir of Ayurveda</p>
      </div>
      
      <div class="content">
        <h2 class="title">Payment Confirmed</h2>
        <p class="subtitle">Thank you for your order!</p>
        
        <p style="font-size: 13px; line-height: 1.6; margin-bottom: 25px;">
          Hello <strong>${escapeHtml(shippingDetails.fullName) || "Valued Customer"}</strong>,<br/><br/>
          We are pleased to confirm that your payment has been received successfully. Your order is currently being processed at our Ahmedabad facility and will be dispatched via our shipping partner shortly.
        </p>
        
        <div class="meta-box">
          <table class="meta-table">
            <tr>
              <td class="meta-label">Order ID:</td>
              <td class="meta-value">${escapeHtml(orderId)}</td>
            </tr>
            <tr>
              <td class="meta-label">Date Placed:</td>
              <td class="meta-value" style="font-family: inherit;">${orderDateFormatted}</td>
            </tr>
            <tr>
              <td class="meta-label">Payment Mode:</td>
              <td class="meta-value" style="font-family: inherit;">Prepaid (Razorpay)</td>
            </tr>
          </table>
        </div>
        
        <table class="invoice-table">
          <thead>
            <tr>
              <th style="width: 70%;">Item Description</th>
              <th style="width: 30%; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHtml}
          </tbody>
        </table>
        
        <table class="summary-table">
          <tr>
            <td style="color: #6b7280; font-weight: 500;">Subtotal</td>
            <td style="text-align: right; font-weight: 700; color: #1A2B49;">₹${subTotalAmount}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-weight: 500;">Shipping Charges</td>
            <td style="text-align: right; font-weight: 700; color: #1A2B49;">₹${shippingFee}</td>
          </tr>
          <tr>
            <td class="summary-total">Total Paid</td>
            <td class="summary-total" style="text-align: right;">₹${total}</td>
          </tr>
        </table>
        
        <div class="address-box">
          <h3 class="address-title">Delivery Destination</h3>
          <div class="address-details">
            <strong>${escapeHtml(shippingDetails.fullName)}</strong><br/>
            ${escapeHtml(shippingDetails.address)}<br/>
            ${escapeHtml(shippingDetails.city)}, ${escapeHtml(shippingDetails.state)} - ${escapeHtml(shippingDetails.postalCode)}<br/>
            Phone: ${escapeHtml(shippingDetails.phone)}
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>If you have any questions regarding this invoice, please reach out to <a href="mailto:info@ayurelix.in">info@ayurelix.in</a></p>
        <p>&copy; 2026 Ayurelix. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "Ayurelix Orders <onboarding@resend.dev>",
        to: [email],
        bcc: [process.env.TO_EMAIL || "ayurelix512@gmail.com"],
        subject: `Your Ayurelix Order Confirmation - Order ID: #${orderId.slice(0, 8)}`,
        html: emailHtml
      })
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", data);
      return res.status(resendResponse.status).json({
        error: data.message || "Failed to deliver email through Resend."
      });
    }

    return res.status(200).json({ success: true, messageId: data.id });
  } catch (error) {
    console.error("Invoice runtime delivery error:", error);
    return res.status(500).json({ error: "Internal server error occurred while sending invoice." });
  }
}
