import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {  email, message,name } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: 'admin@cornenterprise.com',
        pass: 'p_Cfp4pj',
      },
    });

    const info = await transporter.sendMail({
        from: `"New Contact Us Entry" <${'admin@cornenterprise.com'}>`,
        to: 'admin@cornenterprise.com',
        subject: "New Contact",
        html: `
           <h1>New Contact Received </h1>
           <h3>Below are their following informations</h3>
           <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `,  
    });

    console.log("Message sent:", info.messageId);
    res.status(200).json({ message: "Thank You for Contacting Us!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}