import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
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
      from: "your_email@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:3000/verify-user/${token}`,
    };

    if (saveVerifyToken) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.send({ error: "Error sending verification email" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "Verification email sent. Check your email." });
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.send({ error: "Error sending verification email" });
  }
};

export default sendEmailVerification;
