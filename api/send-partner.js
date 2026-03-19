import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
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
  }
}