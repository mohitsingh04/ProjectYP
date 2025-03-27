import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendResetEmail(email, token, res) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset",
    html: `Click the following link to reset your password: <a href="${process.env.FRONTEND_DASHBOARD_URL}/reset/${token}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error sending password reset email" });
    } else {
      res
        .status(200)
        .json({ message: "Password reset email sent. Check your email." });
    }
  });
}
