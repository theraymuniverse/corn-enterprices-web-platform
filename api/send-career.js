import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, career, message, role, phone, email, type} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: 'careers@cornenterprise.com',
        pass: 'Ecobank@96',
      },
    });

    const info = await transporter.sendMail({
        from: `"New Entries into Careers Page" <${'careers@cornenterprise.com'}>`,
        to: 'careers@cornenterprise.com',
        subject: "New Entries into Careers Page",
        html: `
           <h1>New Entries into Careers Page </h1>
           <h3>Below are their following informations</h3>
           <p>Name: ${name}</p>
            <p>Career: ${career}</p>
            <p>Message: ${message}</p>
            <p>Role: ${role}</p>
            <p>Job type: ${type}</p>
            <p>Phone: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Thank you for your interest in joining our team!</p>
            <p>Best regards,</p>
        `,  
    });

    console.log("Message sent:", info.messageId);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}