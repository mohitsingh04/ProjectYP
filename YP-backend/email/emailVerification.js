import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
});

export default function sendEmailVerification(email, token, res) {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:3000/email-verified/${token}`,
    };

    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.send({ error: 'Error sending verification email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Verification email sent. Check your email.' });
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.send({ error: 'Error sending verification email' });
    }
};