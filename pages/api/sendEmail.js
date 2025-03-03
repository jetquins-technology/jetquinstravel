import nodemailer from 'nodemailer';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, subject, text, filePath } = req.body;

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return res.status(500).json({ error: 'Email configuration missing.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        try {
            // Read the PDF file from the local path
            const pdfBuffer = fs.readFileSync(filePath);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
                attachments: [
                    {
                        filename: 'receipt.pdf',
                        content: pdfBuffer,
                    },
                ],
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            res.status(500).json({ error: `Failed to send email: ${error.message}` });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}