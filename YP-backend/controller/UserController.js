import User from "../models/Users.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import newUserInfoEmail from "../email/newUserInfoEmail.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      uniqueId,
      name,
      email,
      mobile_no,
      pincode,
      address,
      city,
      state,
      role,
      status,
      permission,
    } = req.body;

    const user = await User.findOne({ uniqueId: uniqueId });
    const profileFile = req.files
      ? req.files.profile[0].path
      : user?.profile[0];

    const profileOriginal = req.files
      ? req.files.profile[0].originalPath
      : user?.profile[1];

    const updatedUser = await User.findOneAndUpdate(
      { uniqueId: uniqueId },
      {
        $set: {
          name,
          email,
          mobile_no,
          pincode,
          address,
          city,
          state,
          role,
          status,
          profile: [profileFile, profileOriginal],
          permissions: permission,
        },
      },
      { new: true }
    );
    if (updateUser) {
      return res.status(200).json({ message: "User Updated Successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ error: "Internal Server Error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const uniqueId = req.params.uniqueId;
    const user = await User.findOne({ uniqueId: uniqueId });
    if (user) {
      await User.findOneAndDelete({ uniqueId: uniqueId })
        .then((result) => {
          const delFile = path.join(__dirname, "../images");
          const DelFilePath = path.join(delFile, user.profile);
          fs.unlink(DelFilePath, (err) => {
            if (err) {
              throw err;
            }
          });
          return res.send({ message: "User Deleted." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "User not found." });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const user = await User.findOne({ uniqueId: uniqueId });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const uniqueId = req.params.uniqueId;
    const user = await User.findOne({ uniqueId: uniqueId });
    if (user) {
      await User.findOne({ uniqueId: uniqueId })
        .then((result) => {
          if (user.profile) {
            const delFile = path.join(__dirname, "../images");
            const DelFilePath = path.join(delFile, user.profile);
            fs.unlink(DelFilePath, (err) => {
              if (err) {
                throw err;
              }
            });
            return res.send({ message: "Profile Deleted." });
          } else {
            return res.send({ error: "No profile to delete." });
          }
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "User not found." });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const UpdateUserProfile = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    let profile = req.files.profile[0].path;
    let originalProfile = req.files.profile[0].originalPath;
    const user = await User.findOne({ uniqueId: uniqueId });

    if (!profile) {
      profile = user.profile;
    }

    await User.findOneAndUpdate(
      { uniqueId: uniqueId },
      {
        $set: {
          profile: [profile, originalProfile],
        },
      }
    );
    return res
      .status(200)
      .json({ message: "User Profile Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { name, email, mobile_no, role } = req.body;
    const existEmail = await User.findOne({ email: email });
    const existMobile = await User.findOne({ mobile_no: mobile_no });
    if (existEmail) {
      return res.status(400).json({ error: "This email is already exist." });
    }
    if (existMobile) {
      return res
        .status(400)
        .json({ error: "This mobile number is already exist." });
    }

    const password = Math.floor(Math.random() * 899999 + 100000);

    const hash = bcrypt.hashSync(String(password), 10);

    const user = await User.findOne().sort({ _id: -1 }).limit(1);
    const x = user ? user.uniqueId + 1 : 1;
    const newUser = User({
      uniqueId: x,
      name,
      email,
      mobile_no,
      role,
      password: hash,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      await newUserInfoEmail({ email, password });
    }

    return res.status(200).json({ message: "User Add Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
