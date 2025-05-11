// backend/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST'],
}));
app.use(express.json());

app.post('/send-newsletter', async (req, res) => {
    const {email} = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: 'hello@cornenterprise.com',
                pass: 'ydhlD7j!'
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: `"Subscription to COR'N Enterprises" <${'hello@cornenterprise.com'}>`,
            cc: email,
            to: 'hello@cornenterprise.com',
            subject: "New Subscription from Newsletter",
            html: `
               <h1>Welcome ${email} to COR'N Enterprises!</h1><p>Thank you for subscribing to our newsletter.</p>
            `,
        });
        

        console.log("Message sent:", info.messageId);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Zoho Error:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
        
    }
});


app.post('/send-career', async (req, res) => {
    const {name, career, message, role} = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: 'careers@cornenterprise.com',
                pass: 'Ecobank@96'
            },
        });

        // Send email
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
            `,
        });
        

        console.log("Message sent:", info.messageId);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Zoho Error:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
        
    }
});

app.post('/send-partner', async (req, res) => {
    const {firstname, email, message,phone, surname, businessName, website, role, product} = req.body;

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

        // Send email
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
        console.error("Zoho Error:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
        
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
