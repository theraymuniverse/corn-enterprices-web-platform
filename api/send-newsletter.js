import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email } = req.body;

       if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

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

        // Internal notification to COR'N team
        await transporter.sendMail({
            from: `"COR'N Enterprises Newsletter" <hello@cornenterprise.com>`,
            to: 'hello@cornenterprise.com',
            subject: `New Newsletter Subscriber — ${email}`,
            html: `
                <h2>New Newsletter Subscriber</h2>
                <p><strong>Email:</strong> ${email}</p>
            `,
        });

        await transporter.sendMail({
            from: `"COR'N Enterprises Limited" <hello@cornenterprise.com>`,
            to: email,
            subject: `Welcome to COR'N Enterprises Newsletter`,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
                    <div style="background:#1a4731;padding:24px 32px;">
                        <h1 style="color:#fff;margin:0;font-size:20px;">You're Subscribed!</h1>
                        <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
                    </div>
                    <div style="padding:28px 32px;background:#fff;">
                        <p style="color:#333;font-size:15px;">Thank you for subscribing to our newsletter.</p>
                        <p style="color:#555;font-size:14px;line-height:1.7;">
                            You will now receive updates on our latest loan products, financial tips, 
                            and news from COR'N Enterprises Limited.
                        </p>
                        <p style="color:#555;font-size:14px;">
                            📞 <strong>08023447314</strong><br/>
                            💬 <a href="https://wa.me/2348023447314" style="color:#3dba6f;">WhatsApp Us</a>
                        </p>
                        <p style="color:#1a4731;font-size:14px;font-weight:bold;margin-top:20px;">COR'N Enterprises Limited</p>
                        <p style="color:#999;font-size:12px;margin:0;">Integrity · Boldness · Professionalism</p>
                    </div>
                    <div style="background:#f9f9f9;padding:12px 32px;border-top:1px solid #e0e0e0;text-align:center;">
                        <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
                    </div>
                </div>
            `,
        });


        res.status(200).json({ message: "Subscribed successfully! Check your email for confirmation." });

    } catch (error) {
        console.error("Newsletter Email Error:", error.message);
        // ✅ FIX 4: Always return JSON even on error — never let the catch block
        // end without a response, which also causes "Unexpected end of JSON input"
        res.status(500).json({ message: "Failed to send email. Please try again.", error: error.message });
    }
}