import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

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
    return res.status(500).json({ error: "Database authentication is not configured." });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Authenticate user session with Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Access denied. Invalid session token." });
  }

  // Verify that the user is the administrator
  if (user.email !== "kruti6405@gmail.com") {
    return res.status(403).json({ error: "Access Forbidden. Administrator access is required." });
  }

  const { orderId, email, customerName, awbCode } = req.body;

  if (!orderId || !email || !awbCode) {
    return res.status(400).json({ error: "Required fields (orderId, email, awbCode) are missing." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return res.status(500).json({
      error: "Email service is currently unconfigured."
    });
  }

  const resend = new Resend(resendApiKey);
  const trackingUrl = `https://shiprocket.co/tracking/${encodeURIComponent(awbCode.trim())}`;

  // Escape inputs to prevent HTML injection / XSS in email client
  const escapedCustomerName = escapeHtml(customerName);
  const escapedAwbCode = escapeHtml(awbCode);
  const escapedOrderId = escapeHtml(orderId);

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Your Ayurelix Order is Shipped!</title>
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
        font-size: 11px;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        font-weight: 700;
      }
      .content {
        padding: 35px;
        line-height: 1.6;
      }
      .title {
        font-size: 20px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 20px;
        color: #1A2B49;
        border-bottom: 1px solid rgba(26, 43, 73, 0.08);
        padding-bottom: 12px;
      }
      .awb-box {
        background-color: #FAF8F5;
        border: 1px dashed #B89355;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        margin: 25px 0;
      }
      .awb-label {
        font-size: 12px;
        color: #6b7280;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.1em;
      }
      .awb-code {
        font-size: 24px;
        font-weight: 800;
        color: #1A2B49;
        margin: 5px 0 15px 0;
        letter-spacing: 0.05em;
      }
      .btn {
        display: inline-block;
        background-color: #1A2B49;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 30px;
        font-weight: 700;
        border-radius: 12px;
        font-size: 14px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        transition: background-color 0.2s;
      }
      .footer {
        background-color: #FAF8F5;
        padding: 25px;
        text-align: center;
        font-size: 11px;
        color: #6b7280;
        border-top: 1px solid rgba(26, 43, 73, 0.05);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>AYURELIX</h1>
        <p>The Elixir of Ayurveda</p>
      </div>
      <div class="content">
        <h2 class="title">Your Order Has Shipped! 📦</h2>
        <p>Dear ${escapedCustomerName},</p>
        <p>Exciting news! Your wellness formulations have been hand-packaged and handed over to our shipping partner. Your order is officially on its way to you.</p>
        
        <div class="awb-box">
          <span class="awb-label">Tracking AWB Code</span>
          <div class="awb-code">${escapedAwbCode}</div>
          <a href="${trackingUrl}" class="btn" target="_blank">Track Your Shipment</a>
        </div>

        <p>Please note that it may take a few hours for the tracking information to update on the shipping partner's portal.</p>
        <p>Thank you for choosing Ayurelix. We hope our wellness formulations bring harmony and glow to your daily routine.</p>
      </div>
      <div class="footer">
        <p>If you have any questions regarding your shipment, please contact support at <a href="mailto:info@ayurelix.in" style="color: #B89355; text-decoration: none;">info@ayurelix.in</a></p>
        <p>&copy; 2026 Ayurelix. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Ayurelix <onboarding@resend.dev>',
      to: [email],
      subject: `Your Ayurelix Order #${escapedOrderId.slice(0, 8).toUpperCase()} has been Shipped!`,
      html: emailHtml,
    });

    return res.status(200).json({ success: true, messageId: data.id });
  } catch (error) {
    console.error("Resend API error:", error);
    return res.status(500).json({ error: "Failed to send tracking email via Resend: " + error.message });
  }
}
