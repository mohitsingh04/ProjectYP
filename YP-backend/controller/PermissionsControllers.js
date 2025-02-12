import Permissions from "../models/Permissions.js";

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permissions.find();
    return res.status(200).json(permissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
