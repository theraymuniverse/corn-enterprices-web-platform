import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Resend } from 'resend'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

// ── Middleware ──────────────────────────────────────────────
app.use(helmet())

app.use(cors({
  origin: [
    'https://www.cornenterprise.com',
    'https://cornenterprise.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}))

app.options('*', cors())
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use(limiter)


const FROM_DEFAULT = "COR'N Enterprises <hello@cornenterprise.com>"
const FROM_ADMIN   = "COR'N Enterprises <admin@cornenterprise.com>"
const FROM_CAREERS = "COR'N Enterprises Careers <hello@cornenterprise.com>"


app.get('/', (req, res) => {
  res.status(200).json({ message: "COR'N Enterprises server is running." })
})



app.post('/api/send-newsletter', async (req, res) => {
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
})


// ── Contact Form ─────────────────────────────────────────────
app.post('/api/send-contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  try {
    await resend.emails.send({
      from: FROM_DEFAULT,
      to: 'cornenterprises2709@gmail.com',
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
})



app.post('/api/send-loan-application', async (req, res) => {
  const {
    fullName, phone, email, address, cityState,
    employmentStatus, employerName, workAddress, monthlyIncome, yearsAtJob,
    loanType, loanAmount, loanPurpose, repaymentDuration,
    guarantorName, guarantorPhone, guarantorRelationship, guarantorOccupation,
    work_id_url, salary_slip_url,
  } = req.body

  if (!fullName || !email || !loanType) {
    return res.status(400).json({ message: 'Required fields are missing' })
  }

  try {
    await resend.emails.send({
      from: FROM_DEFAULT,
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Loan Application — ${fullName} (${loanType})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Loan Application</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;">Personal Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}, ${cityState}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Employment</h3>
            <p><strong>Status:</strong> ${employmentStatus}</p>
            <p><strong>Employer:</strong> ${employerName}</p>
            <p><strong>Work Address:</strong> ${workAddress}</p>
            <p><strong>Monthly Income:</strong> ₦${monthlyIncome}</p>
            <p><strong>Years at Job:</strong> ${yearsAtJob}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Loan Details</h3>
            <p><strong>Type:</strong> ${loanType}</p>
            <p><strong>Amount:</strong> ${loanAmount}</p>
            <p><strong>Purpose:</strong> ${loanPurpose}</p>
            <p><strong>Repayment Duration:</strong> ${repaymentDuration}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Guarantor</h3>
            <p><strong>Name:</strong> ${guarantorName}</p>
            <p><strong>Phone:</strong> ${guarantorPhone}</p>
            <p><strong>Relationship:</strong> ${guarantorRelationship}</p>
            <p><strong>Occupation:</strong> ${guarantorOccupation}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Documents</h3>
            <p><strong>Work ID:</strong> ${work_id_url ? `<a href="${work_id_url}" style="color:#3dba6f;">View Document</a>` : 'Not uploaded'}</p>
            <p><strong>Salary Slip:</strong> ${salary_slip_url ? `<a href="${salary_slip_url}" style="color:#3dba6f;">View Document</a>` : 'Not uploaded'}</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: FROM_DEFAULT,
      to: email,
      subject: "Loan Application Received — COR'N Enterprises Limited",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Application Received</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:28px 32px;background:#fff;border:1px solid #e0e0e0;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p style="color:#555;">Your loan application has been received. Our team will review it shortly.</p>
            <div style="background:#f0f9f4;padding:14px;border-radius:6px;margin:16px 0;">
              <p style="margin:0;color:#1a4731;font-size:13px;"><strong>Type:</strong> ${loanType}</p>
              <p style="margin:6px 0 0;color:#1a4731;font-size:13px;"><strong>Amount:</strong> ${loanAmount}</p>
              <p style="margin:6px 0 0;color:#1a4731;font-size:13px;"><strong>Repayment:</strong> ${repaymentDuration}</p>
            </div>
            <p style="color:#555;">📞 <strong>08023447314</strong><br/>
            💬 <a href="https://wa.me/2348023447314" style="color:#3dba6f;">WhatsApp Us</a></p>
            <p style="color:#1a4731;font-weight:bold;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;">Integrity · Boldness · Professionalism</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Loan application submitted successfully!' })
  } catch (error) {
    console.error('Loan Error:', error.message)
    res.status(500).json({ message: 'Failed to submit application. Please try again.', errorDetail: error.message })
  }
})


// ── Career Application ────────────────────────────────────────
app.post('/api/send-career', async (req, res) => {
  const { name, background, message, role, phone, email, type } = req.body
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' })

  try {
    await resend.emails.send({
      from: FROM_CAREERS,
      to: 'careers@cornenterprise.com',
      replyTo: email,
      subject: `New Career Application — ${name} (${type || role})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Career Application</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Position Applying For:</strong> ${type}</p>
            <p><strong>Background of Study:</strong> ${background}</p>
            <p><strong>Why joining:</strong> ${message}</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Application submitted successfully!' })
  } catch (error) {
    console.error('Career Error:', error.message)
    res.status(500).json({ message: 'Failed to send application. Please try again.', errorDetail: error.message })
  }
})


// ── Partner / Investor ────────────────────────────────────────
app.post('/api/send-partner', async (req, res) => {
  const { firstname, email, message, phone, surname, businessName, website, role} = req.body
  if (!firstname || !email) return res.status(400).json({ message: 'Name and email are required' })

  try {
    await resend.emails.send({
      from: FROM_ADMIN,
      to: 'admin@cornenterprise.com',
      replyTo: email,
      subject: `New Partner/Investor — ${firstname} ${surname} (${role})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Partner / Investor Application</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <p><strong>Name:</strong> ${firstname} ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Website:</strong> ${website || 'N/A'}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Partner application submitted successfully!' })
  } catch (error) {
    console.error('Partner Error:', error.message)
    res.status(500).json({ message: 'Failed to send application. Please try again.', errorDetail: error.message })
  }
})


app.post('/api/send-guarantor', async (req, res) => {
  const { firstname, surname, email, phone, businessName, website } = req.body
  if (!firstname || !surname || !email || !phone || !businessName) {
    return res.status(400).json({ message: 'Required fields are missing' })
  }

  const fullName = `${firstname} ${surname}`

  try {
    // Notify admin
    await resend.emails.send({
      from: FROM_ADMIN,
      to: 'admin@cornenterprise.com',
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
})


module.exports = app;