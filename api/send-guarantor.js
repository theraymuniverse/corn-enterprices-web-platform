import { Resend } from 'resend'

const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

const FROM_ADMIN = "COR'N Enterprises <Management@cornenterprise.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { firstname, surname, email, phone, businessName, website } = req.body
  if (!firstname || !surname || !email || !phone || !businessName) {
    return res.status(400).json({ message: 'Required fields are missing' })
  }

  const fullName = `${firstname} ${surname}`

  try {
    // Notify admin
    await resend.emails.send({
      from: FROM_ADMIN,
      to: 'Management@cornenterprise.com',
      replyTo: email,
      subject: `New Guarantor Registration — ${fullName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Guarantor Registration</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <p style="color:#555;font-size:14px;margin:0 0 20px;">A new guarantor has submitted their details via the website.</p>
            <div style="background:#f0f9f4;border-radius:8px;padding:20px 24px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:10px 0;font-weight:bold;color:#1a4731;width:40%;">Full Name</td>
                  <td style="padding:10px 0;">${fullName}</td>
                </tr>
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:10px 0;font-weight:bold;color:#1a4731;">Email</td>
                  <td style="padding:10px 0;">${email}</td>
                </tr>
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:10px 0;font-weight:bold;color:#1a4731;">Phone</td>
                  <td style="padding:10px 0;">${phone}</td>
                </tr>
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:10px 0;font-weight:bold;color:#1a4731;">Business Name</td>
                  <td style="padding:10px 0;">${businessName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#1a4731;">Website</td>
                  <td style="padding:10px 0;">${website || 'Not provided'}</td>
                </tr>
              </table>
            </div>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    })


    await resend.emails.send({
      from: FROM_ADMIN,
      to: email,
      subject: "Guarantor Registration Received — COR'N Enterprises Limited",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Registration Received</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <p style="color:#333;font-size:15px;margin:0 0 12px;">Dear <strong>${fullName}</strong>,</p>
            <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 20px;">
              Thank you for registering as a guarantor with COR'N Enterprises Limited.
              We have received your details and our team will be in touch with you shortly.
            </p>
            <div style="background:#f0f9f4;border-radius:8px;padding:20px 24px;margin-bottom:20px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:8px 0;font-weight:bold;color:#1a4731;width:40%;">Full Name</td>
                  <td style="padding:8px 0;">${fullName}</td>
                </tr>
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:8px 0;font-weight:bold;color:#1a4731;">Phone</td>
                  <td style="padding:8px 0;">${phone}</td>
                </tr>
                <tr style="border-bottom:1px solid #e0f0e8;">
                  <td style="padding:8px 0;font-weight:bold;color:#1a4731;">Business Name</td>
                  <td style="padding:8px 0;">${businessName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:bold;color:#1a4731;">Website</td>
                  <td style="padding:8px 0;">${website || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            <p style="color:#555;font-size:13px;">Questions? Email us at
              <a href="mailto:admin@cornenterprise.com" style="color:#1a4731;font-weight:bold;">admin@cornenterprise.com</a>
            </p>
            <p style="color:#1a4731;font-size:14px;font-weight:bold;margin-top:24px;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;margin:0;">Integrity · Boldness · Professionalism</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Guarantor registration submitted successfully!' })
  } catch (error) {
    console.error('Guarantor Email Error:', error.message)
    res.status(500).json({ message: 'Failed to send email. Please try contacting us via WhatsApp.', errorDetail: error.message })
  }
}