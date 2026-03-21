import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    await resend.emails.send({
      from: 'COR\'N Enterprises Sales <hello@cornenterprise.com>',
      to: 'sales@cornenterprise.com',
      subject: 'New Sale/Order Inquiry',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Sale/Order Inquiry</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <div style="background:#f0f9f4;border-radius:8px;padding:16px 20px;margin:20px 0;">
              <p style="margin:0;color:#555;font-size:14px;white-space:pre-line;">${message}</p>
            </div>
            <p style="color:#1a4731;font-size:14px;font-weight:bold;margin-top:24px;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;margin:0;">Integrity · Boldness · Professionalism</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Sale inquiry sent successfully!" });

  } catch (error) {
    console.error('Sale Email Error:', error.message);
    res.status(500).json({
      message: 'Failed to send email. Please try contacting us via WhatsApp.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}