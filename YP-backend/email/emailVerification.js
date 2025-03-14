import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5832f6caafc9bd",
    pass: "1ec06c5bff684d",
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
      html: `Click the following link to verify your email: <a href="http://localhost:3001/verify-user/${token}" target="_blank">Verify</a>`,
    };

    if (saveVerifyToken) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
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
  }
};

export default sendEmailVerification;
