export default async function handler(req, res) {
  // Allow all CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const email = process.env.SHIPROCKET_EMAIL;
  const pw = process.env.SHIPROCKET_PASSWORD;

  if (!email || !pw) {
    return res.status(200).json({
      error: "Credentials missing on Vercel environment.",
      emailExists: !!email,
      passwordExists: !!pw
    });
  }

  try {
    const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password: pw })
    });

    const status = authRes.status;
    const body = await authRes.json();

    return res.status(200).json({
      status,
      body,
      emailLength: email.length,
      passwordLength: pw.length,
      emailMasked: email.slice(0, 3) + "..." + email.slice(-3),
      passwordMasked: pw.slice(0, 2) + "..." + pw.slice(-2)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
