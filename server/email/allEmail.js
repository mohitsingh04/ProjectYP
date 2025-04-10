import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

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

export const sendEmailVerification = async ({ uniqueId, email }) => {
  try {
    const token = jwt.sign({ uniqueId }, process.env.JWT_SECRET_VALUE, {
      expiresIn: "1h",
    });

    const saveVerifyToken = await User.findOneAndUpdate(
      { uniqueId },
      {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      },
      { new: true }
    );

    if (!saveVerifyToken) {
      console.error("User not found or token update failed.");
      return { success: false, message: "User not found." };
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `
        <p>Click the following link to verify your email:</p>
        <a href="${process.env.FRONTEND_DASHBOARD_URL}/verify-user/${token}" target="_blank">Verify</a>
        <p>This link expires in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Verification email sent. Check your inbox.",
    };
  } catch (err) {
    console.error("Error in sendEmailVerification:", err);
    return { success: false, message: "Internal server error." };
  }
};

export const sendResetEmail = async (user, res) => {
  try {
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_VALUE,
      { expiresIn: "1h" }
    );

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          resetToken: token,
          resetTokenExpiry: new Date(Date.now() + 3600000),
        },
      },
      { new: true }
    );

    const resetUrl = `${process.env.FRONTEND_DASHBOARD_URL}/reset/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password (valid for 1 hour):</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ error: "Error sending password reset email. Please try again." });
  }
};

export const newUserInfoEmail = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome! Here is your login password",
      html: `<p>Dear User,</p>
        <p>Welcome to our platform! Below is your login password:</p>
        <p><strong>Email: ${email}</strong></p>
        <p><strong>Password: ${password}</strong></p>
        <p>Please use this password to log in. You can change your password after logging in through your account settings.</p>
        <p>If you need any assistance, feel free to contact our support team.</p>
        <p>Best regards,</p>
        <p>Admission Jockey</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (!info || !info.messageId) {
      throw new Error("Failed to send email.");
    }

    return { message: "Email sent successfully." };
  } catch (error) {
    console.error("Email sending error:", error.message);
    return { success: false, error: error.message };
  }
};
