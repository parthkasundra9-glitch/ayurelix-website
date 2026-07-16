import { Resend } from 'resend';

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
  const trackingUrl = `https://shiprocket.co/tracking/${awbCode}`;

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
        <p>Dear ${customerName},</p>
        <p>Exciting news! Your wellness formulations have been hand-packaged and handed over to our shipping partner. Your order is officially on its way to you.</p>
        
        <div class="awb-box">
          <span class="awb-label">Tracking AWB Code</span>
          <div class="awb-code">${awbCode}</div>
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
      from: 'Ayurelix <onboarding@resend.dev>', // Change to verified domain if configured
      to: [email],
      subject: `Your Ayurelix Order #${orderId.slice(0, 8).toUpperCase()} has been Shipped!`,
      html: emailHtml,
    });

    return res.status(200).json({ success: true, messageId: data.id });
  } catch (error) {
    console.error("Resend API error:", error);
    return res.status(500).json({ error: "Failed to send tracking email via Resend: " + error.message });
  }
}
