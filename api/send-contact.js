import { Resend } from 'resend'

const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

const FROM_DEFAULT = "COR'N Enterprises <hello@cornenterprise.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  try {
    await resend.emails.send({
      from: FROM_DEFAULT,
      to: 'hello@cornenterprise.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <hr/><p><em>Reply to respond directly to ${name}.</em></p>
      `,
    })

    await resend.emails.send({
      from: FROM_DEFAULT,
      to: email,
      subject: "We received your message — COR'N Enterprises Limited",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Message Received</h1>
          </div>
          <div style="padding:28px 32px;background:#fff;border:1px solid #e0e0e0;">
            <p>Dear <strong>${name}</strong>,</p>
            <p style="color:#555;">Thank you for contacting COR'N Enterprises Limited. We will respond shortly.</p>
            <blockquote style="border-left:4px solid #3dba6f;padding:10px 16px;color:#555;">${message}</blockquote>
            <p style="color:#555;">📞 <strong>08023447314</strong><br/>
            💬 <a href="https://wa.me/2348023447314" style="color:#3dba6f;">WhatsApp Us</a></p>
            <p style="color:#1a4731;font-weight:bold;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;">Integrity · Boldness · Professionalism</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: "Thank you for contacting us! We'll be in touch shortly." })
  } catch (error) {
    console.error('Contact Error:', error.message)
    res.status(500).json({ message: 'Failed to send email. Please contact us via WhatsApp.', errorDetail: error.message })
  }
}