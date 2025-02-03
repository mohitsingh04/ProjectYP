import User from "../models/Users.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
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
    } = req.body;
    const profileFile = req.files["profile"];
    let userProfile = req.body.profile; // Default to existing profile

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if (profileFile) {
      userProfile = req.files["profile"][0].filename;
    }

    const user = await User.findOne({ uniqueId: uniqueId });

    await User.findOneAndUpdate(
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
          profile: userProfile,
          role,
          status,
        },
      }
    )
      .then(async (result) => {
        if (user.profile && userProfile !== user.profile) {
          const delFile = path.join(__dirname, "../images");
          const DelFilePath = path.join(delFile, user.profile);
          if (fs.existsSync(DelFilePath)) {
            fs.unlinkSync(DelFilePath);
          }
        }
        return res.send({ message: "Profile updated." });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).send({ error: "Internal Server Error." });
      });
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
