import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


app.use(helmet())


app.use(cors({
  origin: [
    'https://www.cornenterprise.com',
    'https://cornenterprise.com',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}))

app.options('*', cors())

app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use(limiter)

const createTransporter = (user, pass) => {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  })
}


app.get('/', (req, res) => {
  res.status(200).json({ message: "COR'N Enterprises server is running." })
})

app.post('/send-newsletter', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try {
    const transporter = createTransporter('hello@cornenterprise.com', 'ydhlD7j!')

    await transporter.sendMail({
      from: '"COR\'N Enterprises Newsletter" <hello@cornenterprise.com>',
      to: 'hello@cornenterprise.com',
      cc: email,
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    })

    res.status(200).json({ message: 'Subscribed successfully!' })
  } catch (error) {
    console.error('Newsletter Error:', error.message)
    res.status(500).json({ message: 'Failed to send email', error: error.message })
  }
})


app.post('/send-contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  try {
    const transporter = createTransporter('hello@cornenterprise.com', 'ydhlD7j!')

    // Internal notification
    await transporter.sendMail({
      from: '"COR\'N Enterprises Contact Form" <hello@cornenterprise.com>',
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <p><em>Reply to this email to respond directly to ${name}.</em></p>
      `,
    })

    // Confirmation to sender
    await transporter.sendMail({
      from: '"COR\'N Enterprises Limited" <hello@cornenterprise.com>',
      to: email,
      subject: "We received your message — COR'N Enterprises Limited",
      html: `
        <h2>Message Received</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for contacting COR'N Enterprises Limited. We have received your message and will respond shortly.</p>
        <blockquote style="border-left:4px solid #3dba6f;padding:10px 16px;color:#555;">${message}</blockquote>
        <p>For urgent inquiries:<br/>
        📞 <strong>08023447314</strong><br/>
        💬 <a href="https://wa.me/2348023447314">WhatsApp Us</a></p>
        <p><strong>COR'N Enterprises Limited</strong><br/>
        <small>Integrity · Boldness · Professionalism</small></p>
      `,
    })

    res.status(200).json({ message: "Thank you for contacting us! We'll be in touch shortly." })
  } catch (error) {
    console.error('Contact Error:', error.message)
    res.status(500).json({ message: 'Failed to send email', error: error.message })
  }
})

app.post('/send-loan-application', async (req, res) => {
  const {
    fullName, phone, email, address, cityState,
    employmentStatus, employerName, workAddress, monthlyIncome, yearsAtJob,
    loanType, loanAmount, loanPurpose, repaymentDuration,
    guarantorName, guarantorPhone, guarantorRelationship, guarantorOccupation,
  } = req.body

  if (!fullName || !email || !loanType) {
    return res.status(400).json({ message: 'Required fields are missing' })
  }

  try {
    const transporter = createTransporter('hello@cornenterprise.com', 'ydhlD7j!')

    // Internal — full application details
    await transporter.sendMail({
      from: '"COR\'N Loan Applications" <hello@cornenterprise.com>',
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Loan Application — ${fullName} (${loanType})`,
      html: `
        <h2>New Loan Application Received</h2>
        <h3 style="color:#1a4731;">Personal Information</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>City/State:</strong> ${cityState}</p>

        <h3 style="color:#1a4731;">Employment Information</h3>
        <p><strong>Status:</strong> ${employmentStatus}</p>
        <p><strong>Employer/Business:</strong> ${employerName}</p>
        <p><strong>Work Address:</strong> ${workAddress}</p>
        <p><strong>Monthly Income:</strong> ₦${monthlyIncome}</p>
        <p><strong>Years at Job:</strong> ${yearsAtJob}</p>

        <h3 style="color:#1a4731;">Loan Details</h3>
        <p><strong>Loan Type:</strong> ${loanType}</p>
        <p><strong>Amount:</strong> ${loanAmount}</p>
        <p><strong>Purpose:</strong> ${loanPurpose}</p>
        <p><strong>Repayment Duration:</strong> ${repaymentDuration}</p>

        <h3 style="color:#1a4731;">Guarantor Information</h3>
        <p><strong>Name:</strong> ${guarantorName}</p>
        <p><strong>Phone:</strong> ${guarantorPhone}</p>
        <p><strong>Relationship:</strong> ${guarantorRelationship}</p>
        <p><strong>Occupation:</strong> ${guarantorOccupation}</p>
      `,
    })

    // Confirmation to applicant
    await transporter.sendMail({
      from: '"COR\'N Enterprises Limited" <hello@cornenterprise.com>',
      to: email,
      subject: "Loan Application Received — COR'N Enterprises Limited",
      html: `
        <h2>Application Received</h2>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Thank you for submitting your loan application. Our team will review it and may contact you shortly.</p>
        <p><strong>Loan Type:</strong> ${loanType}<br/>
        <strong>Amount:</strong> ${loanAmount}<br/>
        <strong>Repayment:</strong> ${repaymentDuration}</p>
        <p>Qualified applicants may receive approval within minutes after document verification.</p>
        <p>📞 <strong>08023447314</strong><br/>
        💬 <a href="https://wa.me/2348023447314">WhatsApp Us</a></p>
        <p><strong>COR'N Enterprises Limited</strong><br/>
        <small>Integrity · Boldness · Professionalism</small></p>
      `,
    })

    res.status(200).json({ message: 'Loan application submitted successfully!' })
  } catch (error) {
    console.error('Loan Application Error:', error.message)
    res.status(500).json({ message: 'Failed to send application', error: error.message })
  }
})

// ── Career ───────────────────────────────────────────────────
app.post('/send-career', async (req, res) => {
  const { name, career, message, role, phone, email, type } = req.body
  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' })

  try {
    const transporter = createTransporter('careers@cornenterprise.com', 'Ecobank@96')

    await transporter.sendMail({
      from: '"COR\'N Careers" <careers@cornenterprise.com>',
      to: 'careers@cornenterprise.com',
      replyTo: email,
      subject: `New Career Application — ${name} (${type || role})`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${type || 'N/A'}</p>
        <p><strong>Background:</strong> ${career}</p>
        <p><strong>Why joining:</strong> ${message}</p>
      `,
    })

    res.status(200).json({ message: 'Application submitted successfully!' })
  } catch (error) {
    console.error('Career Error:', error.message)
    res.status(500).json({ message: 'Failed to send application', error: error.message })
  }
})

// ── Partner / Investor ────────────────────────────────────────
app.post('/send-partner', async (req, res) => {
  const { firstname, email, message, phone, surname, businessName, website, role, product } = req.body
  if (!firstname || !email) return res.status(400).json({ message: 'Name and email are required' })

  try {
    const transporter = createTransporter('admin@cornenterprise.com', 'p_Cfp4pj')

    await transporter.sendMail({
      from: '"COR\'N Partner Applications" <admin@cornenterprise.com>',
      to: 'admin@cornenterprise.com',
      replyTo: email,
      subject: `New Partner/Investor — ${firstname} ${surname} (${role})`,
      html: `
        <h2>New Partner / Investor Application</h2>
        <p><strong>Name:</strong> ${firstname} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Website:</strong> ${website || 'N/A'}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Product/Quantity:</strong> ${product || 'N/A'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    res.status(200).json({ message: 'Partner application submitted successfully!' })
  } catch (error) {
    console.error('Partner Error:', error.message)
    res.status(500).json({ message: 'Failed to send application', error: error.message })
  }
})

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))