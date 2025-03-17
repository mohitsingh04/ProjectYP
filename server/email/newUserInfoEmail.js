import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const newUserInfoEmail = async ({ email, password }) => {
  try {
    const mailOptions = {
      from: "ms6498289@gmail.com",
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

    await transporter.sendMail(mailOptions);

    return "mail send";
  } catch (error) {
    console.log("Internal Error");
  }
};
export default newUserInfoEmail;
