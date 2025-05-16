import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {  messageForEmail } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: 'sales@cornenterprise.com',
                pass: '',
            },
        });

        await transporter.sendMail({
            from: `"Upcoming Sale COR'N Enterprises" <${'sales@cornenterprise.com'}>`,
            to: 'sales@cornenterprise.com',
            subject: "Upcoming Sale",
            html: `<p>New Sale Order: ${ messageForEmail }</p>`,
        });

        res.status(200).json({ message: "Joined Newsletter Successfully" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
}