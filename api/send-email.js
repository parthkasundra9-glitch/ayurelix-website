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

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields (name, email, message) are missing." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return res.status(500).json({
      error: "Email service is currently unconfigured. Please configure the RESEND_API_KEY environment variable."
    });
  }

  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium"
  });

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Ayurelix Inquiry</title>
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
      }
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(26, 43, 73, 0.08);
        padding-bottom: 12px;
        color: #1A2B49;
      }
      .inquiry-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 25px;
      }
      .inquiry-table td {
        padding: 12px 0;
        border-bottom: 1px solid #FAF8F5;
        vertical-align: top;
      }
      .inquiry-table td.label {
        font-weight: 700;
        color: #B89355;
        width: 140px;
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.08em;
      }
      .inquiry-table td.value {
        color: #1A2B49;
        font-size: 13.5px;
      }
      .message-title {
        font-weight: 700;
        color: #B89355;
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.08em;
        margin-bottom: 8px;
      }
      .message-box {
        background-color: #FAF8F5;
        border-left: 3px solid #B89355;
        padding: 16px;
        border-radius: 0 12px 12px 0;
      }
      .message-text {
        color: #334155;
        font-size: 13.5px;
        line-height: 1.6;
        white-space: pre-wrap;
        margin: 0;
      }
      .footer {
        background-color: #FAF8F5;
        padding: 24px;
        text-align: center;
        font-size: 11px;
        color: #64748B;
        border-top: 1px solid rgba(26, 43, 73, 0.05);
      }
      .footer p {
        margin: 4px 0;
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
        <div class="title">New Customer Inquiry</div>
        <table class="inquiry-table">
          <tr>
            <td class="label">Full Name</td>
            <td class="value"><strong>${name}</strong></td>
          </tr>
          <tr>
            <td class="label">Email Address</td>
            <td class="value"><a href="mailto:${email}" style="color: #1A2B49; font-weight: 600;">${email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone Number</td>
            <td class="value">${phone || "Not Provided"}</td>
          </tr>
          <tr>
            <td class="label">Subject</td>
            <td class="value">${subject || "General Inquiry"}</td>
          </tr>
          <tr>
            <td class="label">Submitted On</td>
            <td class="value">${formattedDate}</td>
          </tr>
        </table>
        
        <div class="message-title">Message Details</div>
        <div class="message-box">
          <p class="message-text">${message}</p>
        </div>
      </div>
      <div class="footer">
        <p>This message was sent securely via the contact form on your website.</p>
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
        from: process.env.FROM_EMAIL || "Ayurelix Contact <onboarding@resend.dev>",
        to: [process.env.TO_EMAIL || "ayurelix512@gmail.com"],
        reply_to: email,
        subject: `New Ayurelix Inquiry: ${subject || "General Consultation"}`,
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
    console.error("Delivery runtime error:", error);
    return res.status(500).json({ error: "Internal server error occurred while sending email." });
  }
}
