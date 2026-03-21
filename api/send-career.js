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

  const { name, career, message, role, phone, email, type} = req.body;

  try {
    await resend.emails.send({
      from: 'COR\'N Careers <hello@cornenterprise.com>',
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
    });

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}