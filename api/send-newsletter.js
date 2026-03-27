import { Resend } from 'resend'

const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

const FROM_DEFAULT = "COR'N Enterprises <hello@cornenterprise.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try {
    await resend.emails.send({
      from: FROM_DEFAULT,
      to: 'hello@cornenterprise.com',
      subject: `New Newsletter Subscriber — ${email}`,
      html: `<h2>New Newsletter Subscriber</h2><p><strong>Email:</strong> ${email}</p>`,
    })

    await resend.emails.send({
      from: FROM_DEFAULT,
      to: email,
      subject: "Welcome to COR'N Enterprises Newsletter",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">You're Subscribed!</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:28px 32px;background:#fff;border:1px solid #e0e0e0;">
            <p style="color:#333;">Thank you for subscribing to our newsletter.</p>
            <p style="color:#555;font-size:14px;">You will receive updates on our latest loan products and financial tips.</p>
            <p style="color:#555;font-size:14px;">📞 <strong>08023447314</strong><br/>
            💬 <a href="https://wa.me/2348023447314" style="color:#3dba6f;">WhatsApp Us</a></p>
            <p style="color:#1a4731;font-weight:bold;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;">Integrity · Boldness · Professionalism</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Subscribed successfully! Check your email for confirmation.' })
  } catch (error) {
    console.error('Newsletter Error:', error.message)
    res.status(500).json({ message: 'Failed to send email. Please try again.', errorDetail: error.message })
  }
}