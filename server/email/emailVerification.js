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

const sendEmailVerification = async ({ uniqueId, email, emailType }) => {
  try {
    const token = jwt.sign({ uniqueId }, process.env.JWT_SECRET_VALUE);

    const saveVerifyToken = await User.findOneAndUpdate(
      { uniqueId: uniqueId },
      {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      },
      { new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `Click the following link to verify your email: <a href="${process.env.FRONTEND_DASHBOARD_URL}/verify-user/${token}" target="_blank">Verify</a>`,
    };

    if (saveVerifyToken) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        } else {
          return res
            .status(200)
            .json({ message: "Verification email sent. Check your email." });
        }
      });
    }
  } catch (err) {
    console.error("Internal Error in mail");
  }
};

export default sendEmailVerification;
