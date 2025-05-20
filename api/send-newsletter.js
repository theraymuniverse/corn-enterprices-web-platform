import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: 'hello@cornenterprise.com',
                pass: 'ydhlD7j!',
            },
        });

        await transporter.sendMail({
            from: `"Subscription from COR'N Enterprises" <${'hello@cornenterprise.com'}>`,
            to: 'hello@cornenterprise.com',
            to: email,
            subject: "New Subscription to Cor'n Newsletter",
            html: `<p>New subscriber: ${email}</p>
            <p>Thank you for subscribing to our newsletter!</p>`,
        });

        res.status(200).json({ message: "Joined Newsletter Successfully" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
}