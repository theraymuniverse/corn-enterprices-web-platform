import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, message, name } = req.body;

  if (!email || !message || !name) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'sales@cornenterprise.com',
        pass: 'ncf9A_xq',
      },
    });
    await transporter.verify();

    await transporter.sendMail({
      from: '"COR\'N Enterprises Contact Form" <sales@cornenterprise.com>',
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Message</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited — Website Contact Form</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#555;font-size:13px;width:30%;">Full Name</td><td style="padding:10px 0;font-weight:bold;color:#111;font-size:13px;">${name}</td></tr>
              <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#555;font-size:13px;">Email</td><td style="padding:10px 0;font-weight:bold;color:#111;font-size:13px;">${email}</td></tr>
              <tr style="border-top:1px solid #f0f0f0;"><td style="padding:10px 0;color:#555;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#333;font-size:13px;line-height:1.6;">${message}</td></tr>
            </table>
            <div style="background:#f0f9f4;border-left:4px solid #3dba6f;padding:12px 16px;border-radius:4px;margin-top:20px;">
              <p style="margin:0;color:#1a4731;font-size:13px;">Hit <strong>Reply</strong> to respond directly to <strong>${name}</strong>.</p>
            </div>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">COR'N Enterprises Limited — Contact Form</p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: '"COR\'N Enterprises Limited" <sales@cornenterprise.com>',
      to: email,
      subject: `We received your message — COR'N Enterprises Limited`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Message Received</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <p style="color:#333;font-size:15px;">Dear <strong>${name}</strong>,</p>
            <p style="color:#555;font-size:14px;line-height:1.7;">Thank you for reaching out to COR'N Enterprises Limited. We have received your message and a member of our team will respond to you shortly.</p>
            <div style="background:#f0f9f4;border-radius:8px;padding:16px 20px;margin:20px 0;">
              <p style="margin:0;color:#555;font-size:13px;font-style:italic;">"${message}"</p>
            </div>
            <p style="color:#555;font-size:14px;line-height:1.7;">For urgent inquiries:</p>
            <p style="color:#555;font-size:14px;">📞 <strong>08023447314</strong><br/>📧 <strong>cornenterprises2709@gmail.com</strong><br/>💬 <a href="https://wa.me/2348023447314" style="color:#3dba6f;">WhatsApp Us</a></p>
            <p style="color:#1a4731;font-size:14px;font-weight:bold;margin-top:24px;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;margin:0;">Integrity · Boldness · Professionalism</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: "Thank you for contacting us! We'll be in touch shortly." });

  } catch (error) {
    console.error('Email Error:', error.message);
    res.status(500).json({
      message: 'Failed to send email. Please try contacting us via WhatsApp.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}