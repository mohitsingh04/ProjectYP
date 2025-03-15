import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendResetEmail from "../email/resetPasswordEmail.js";
import sendEmailVerification from "../email/emailVerification.js";

const Salt = 10;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "User does not exist!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ error: "Incorrect Password." });

    const isVerified = user?.verified;

    if (!isVerified) {
      await sendEmailVerification({
        uniqueId: user.uniqueId,
        email,
        emailType: "VERIFY",
      });
      return res.status(401).json({ error: "You are Not Verified." });
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET_VALUE);

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    delete user.password;
    return res
      .status(200)
      .json({ message: "Logged in successfully.", accessToken, user });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, mobile_no, password, confirm_password } = req.body;
    const passwordHash = await bcrypt.hash(password, Salt);

    const permissions = [
      {
        label: "Read Property",
        value: "Read Property",
      },
      {
        label: "Create Property",
        value: "Create Property",
      },
      {
        label: "Update Property",
        value: "Update Property",
      },
      {
        label: "Delete Property",
        value: "Delete Property",
      },
    ];

    const [existEmail, existMobile] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ mobile_no }),
    ]);

    if (existEmail) {
      return res.send({ error: "This email is already exist." });
    }
    if (existMobile) {
      return res.send({ error: "This mobile number is already exist." });
    }
    if (password !== confirm_password) {
      return res.send({ error: "Please enter the same password." });
    }

    const user = await User.findOne().sort({ _id: -1 }).limit(1);
    const x = user ? user.uniqueId + 1 : 1;
    const newUser = new User({
      uniqueId: x,
      name,
      email,
      mobile_no,
      password: passwordHash,
      permissions: permissions,
    });

    await newUser.save();
    await sendEmailVerification({ uniqueId: x, email, emailType: "VERIFY" });

    return res.send({ message: "Registered Successfully, You can login now." });
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const userData = async (req, res) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return "Access Denited";
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_VALUE);
    const userId = decoded.uniqueId;

    const userData = await User.findOne({ uniqueId: userId });
    return userData;
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const profile = async (req, res) => {
  const user = await userData(req);
  return res.status(200).json({ user });
};

export const changePassword = async (req, res) => {
  try {
    const id = req.body.id;
    const { current_password, new_password, confirm_password } = req.body;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.send({ error: "User not found" });
    }

    if (current_password === new_password) {
      return res.send({
        error: "Old Password and New Password cannot be the same",
      });
    }

    if (new_password !== confirm_password) {
      return res.send({
        error: "New Password and Confirm Password must be same",
      });
    }

    const isMatch = await bcrypt.compare(current_password, user.password);
    const passwordHash = await bcrypt.hash(new_password, Salt);

    if (isMatch) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            password: passwordHash,
          },
        }
      );

      return res.send({ message: "Password changed successfully" });
    } else {
      return res.send({ error: "Current password does not match" });
    }
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ error: "User not found. Please check your email." });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_VALUE);
    await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          resetToken: token,
        },
      }
    );

    sendResetEmail(email, token, res);
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

// export const getResetToken = async (req, res) => {
//     try {
//         const { token } = req.params;

//         const isTokenExpired = await User.findOne({ resetToken: token });

//         if (!isTokenExpired) {
//             return res.send({ error: 'Expired token. Please request a new password reset.' });
//         }

//         res.render('/reset-password', { token });
//     } catch (error) {
//        return res.send({ error: "Internal Server Error" });
//     }
// };

export const getResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    // const expiredToken = await User.findOne({ resetToken: token, resetPasswordExpires: { $gt: Date.now() } });

    // if (!expiredToken) {
    //     return res.send({ error: 'Expired token. Please request a new password reset.' });
    // }

    const validToken = await User.findOne({ resetToken: token });
    if (!validToken) {
      return res.send({ error: "This token is not valid." });
    }

    res.status(200).send({ message: "Valid token", token });
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const postResetToken = async (req, res) => {
  try {
    const { new_password, confirm_password, token } = req.body;

    const passwordHash = await bcrypt.hash(new_password, Salt);

    const user = await User.findOneAndUpdate(
      { resetToken: token },
      {
        $set: {
          password: passwordHash,
          resetToken: null,
        },
      }
    );

    if (!user) {
      return res.send({
        error: "Invalid or expired token. Please request a new password reset.",
      });
    }

    if (new_password === confirm_password) {
      res.send({ message: "Password reset successfully. You can login now." });
    } else {
      return res.send({ error: "Passwords do not match." });
    }
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ error: "User not found. Please check your email." });
    }

    await sendEmailVerification({
      uniqueId: user.uniqueId,
      email,
      emailType: "VERIFY",
    });

    return res.status(200).json({ message: "Mail Send Successfully" });
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const getEmailVerification = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return res.send({ error: "Invalid or expired token!" });
    }

    const verified = await User.findOneAndUpdate(
      { uniqueId: user.uniqueId },
      {
        $set: { verified: true },
        $unset: { verifyToken: "", verifyTokenExpiry: "" },
      },
      { new: true }
    );

    if (verified) {
      return res.send({ message: "Email verified successfully." });
    }
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const getToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Please Login" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
