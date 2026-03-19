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


app.post('/api/send-newsletter', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try {
    const transporter = createTransporter('hello@cornenterprise.com', 'ydhlD7j!')

    await transporter.sendMail({
      from: '"COR\'N Enterprises Newsletter" <hello@cornenterprise.com>',
      to: 'hello@cornenterprise.com',
      subject: `New Newsletter Subscriber — ${email}`,
      html: `<h2>New Newsletter Subscriber</h2><p><strong>Email:</strong> ${email}</p>`,
    })

    
    await transporter.sendMail({
      from: '"COR\'N Enterprises Limited" <hello@cornenterprise.com>',
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
    res.status(500).json({ message: 'Failed to send email. Please try again.', error: error.message })
  }
})


app.post('/api/send-contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  try {
    const transporter = createTransporter('hello@cornenterprise.com', 'ydhlD7j!')

    await transporter.sendMail({
      from: '"COR\'N Enterprises Contact" <hello@cornenterprise.com>',
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

    await transporter.sendMail({
      from: '"COR\'N Enterprises Limited" <hello@cornenterprise.com>',
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
    res.status(500).json({ message: 'Failed to send email. Please try again.', error: error.message })
  }
})


app.post('/api/send-loan-application', async (req, res) => {
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

    await transporter.sendMail({
      from: '"COR\'N Loan Applications" <hello@cornenterprise.com>',
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Loan Application — ${fullName} (${loanType})`,
      html: `
        <h2>New Loan Application</h2>
        <h3 style="color:#1a4731;">Personal Information</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}, ${cityState}</p>
        <h3 style="color:#1a4731;">Employment</h3>
        <p><strong>Status:</strong> ${employmentStatus}</p>
        <p><strong>Employer:</strong> ${employerName}</p>
        <p><strong>Work Address:</strong> ${workAddress}</p>
        <p><strong>Income:</strong> ₦${monthlyIncome}</p>
        <p><strong>Years at Job:</strong> ${yearsAtJob}</p>
        <h3 style="color:#1a4731;">Loan Details</h3>
        <p><strong>Type:</strong> ${loanType}</p>
        <p><strong>Amount:</strong> ${loanAmount}</p>
        <p><strong>Purpose:</strong> ${loanPurpose}</p>
        <p><strong>Repayment:</strong> ${repaymentDuration}</p>
        <h3 style="color:#1a4731;">Guarantor</h3>
        <p><strong>Name:</strong> ${guarantorName}</p>
        <p><strong>Phone:</strong> ${guarantorPhone}</p>
        <p><strong>Relationship:</strong> ${guarantorRelationship}</p>
        <p><strong>Occupation:</strong> ${guarantorOccupation}</p>
      `,
    })

    await transporter.sendMail({
      from: '"COR\'N Enterprises Limited" <hello@cornenterprise.com>',
      to: email,
      subject: "Loan Application Received — COR'N Enterprises Limited",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Application Received</h1>
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
    res.status(500).json({ message: 'Failed to submit application. Please try again.', error: error.message })
  }
})

// ── Career ───────────────────────────────────────────────────
app.post('/api/send-career', async (req, res) => {
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
    res.status(500).json({ message: 'Failed to send application. Please try again.', error: error.message })
  }
})


app.post('/api/send-partner', async (req, res) => {
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
    res.status(500).json({ message: 'Failed to send application. Please try again.', error: error.message })
  }
})


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📬 Routes available:`)
  console.log(`   POST /api/send-newsletter`)
  console.log(`   POST /api/send-contact`)
  console.log(`   POST /api/send-loan-application`)
  console.log(`   POST /api/send-career`)
  console.log(`   POST /api/send-partner`)
})