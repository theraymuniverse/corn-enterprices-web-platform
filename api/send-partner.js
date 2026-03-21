import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

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
    await resend.emails.send({
      from: 'COR\'N Partner Applications <hello@cornenterprise.com>',
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
    });

    res.status(200).json({ message: "Partner application submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}