import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields: name, email, message' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: 'hello@cornenterprise.com',
        pass: 'ydhlD7j!',
      },
    });

    // 1. Internal notification email to the team
    await transporter.sendMail({
      from: `"COR'N Enterprises Contact Form" <hello@cornenterprise.com>`,
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a4731; padding: 20px 28px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Contact Message</h2>
            <p style="color: #3dba6f; margin: 4px 0 0; font-size: 13px;">COR'N Enterprises Limited — Contact Form</p>
          </div>
          <div style="padding: 28px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #555; font-size: 13px; width: 30%;">Name</td>
                <td style="padding: 8px 0; font-weight: bold; color: #111; font-size: 13px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; font-weight: bold; color: #111; font-size: 13px;">${email}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; background-color: #f0f9f4; border-left: 4px solid #3dba6f; padding: 14px 18px; border-radius: 4px;">
              <p style="margin: 0 0 6px; color: #1a4731; font-size: 13px; font-weight: bold;">Message</p>
              <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
          <div style="background-color: #f9f9f9; padding: 14px 28px; border-top: 1px solid #e0e0e0; text-align: center;">
            <p style="margin: 0; color: #bbb; font-size: 11px;">COR'N Enterprises Limited — Contact Form Notification</p>
          </div>
        </div>
      `,
    });

    // 2. Confirmation email to the sender
    await transporter.sendMail({
      from: `"COR'N Enterprises Limited" <hello@cornenterprise.com>`,
      to: email,
      subject: `We received your message — COR'N Enterprises Limited`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a4731; padding: 20px 28px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px;">Message Received</h2>
            <p style="color: #3dba6f; margin: 4px 0 0; font-size: 13px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding: 28px; background-color: #ffffff;">
            <p style="color: #333; font-size: 15px;">Dear <strong>${name}</strong>,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Thank you for reaching out to COR'N Enterprises Limited. We have received your message and a member of our team will respond to you shortly.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              If you need immediate assistance, you can also reach us via:
            </p>
            <p style="color: #555; font-size: 14px;">
              📞 <strong>08023447314</strong><br/>
              💬 <a href="https://wa.me/2348023447314" style="color: #3dba6f;">WhatsApp</a>
            </p>
            <p style="color: #1a4731; font-weight: bold; font-size: 14px; margin-top: 24px;">COR'N Enterprises Limited</p>
            <p style="color: #999; font-size: 12px; margin: 0;">Integrity · Boldness · Professionalism</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 14px 28px; border-top: 1px solid #e0e0e0; text-align: center;">
            <p style="margin: 0; color: #bbb; font-size: 11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: "Thank you for contacting us!" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}