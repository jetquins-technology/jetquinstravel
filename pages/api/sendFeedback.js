import nodemailer from "nodemailer";

export default async function sendFeedback(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { category, experience, feedback, userEmail } = req.body;

    if (!category || !feedback) {
        return res.status(400).json({ error: "Category and feedback are required." });
    }

    try {
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: userEmail,
            to: "himanshu26198@gmail.com",
            subject: `New Feedback: ${category}`,
            text: `
                Feedback Category: ${category}
                Experience: ${experience || "Not provided"}
                Feedback: ${feedback}
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Feedback sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send feedback. Please try again later." });
    }
}
