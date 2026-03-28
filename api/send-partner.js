<<<<<<< HEAD
import { Resend } from 'resend'

const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

const FROM_ADMIN = "COR'N Enterprises <admin@cornenterprise.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

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
=======
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstname, email, message,phone, surname, businessName, website, role, product } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
          user: 'admin@cornenterprise.com',
          pass: 'p_Cfp4pj'
      },
    });

    const info = await transporter.sendMail({
       from: `"New Entries into Parnters and Investors Page" <${'admin@cornenterprise.com'}>`,
            to: 'admin@cornenterprise.com',
            subject: "New Entries into Partners/Investors Page",
            html: `
               <h1>New Entries into Partners/Investors Page </h1>
               <h3>Below are their following informations</h3>
               <p>FirstName: ${firstname}</p>
               <p>Surname: ${surname}</p>
                <p>Email: ${email}</p>
                <p>Phone Number: ${phone}</p>
                <p>Product: ${product}</p>
                <p>Business Name: ${businessName}</p>
                <p>Website: ${website}</p>
                <p>Role: ${role}</p>
                <p>Message: ${message}</p>
            `,
    });

    console.log("Message sent:", info.messageId);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
>>>>>>> parent of 61f9c1a (running)
  }
}