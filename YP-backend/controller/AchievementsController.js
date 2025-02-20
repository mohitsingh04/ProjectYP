import Achievements from "../models/Achievements.js";

export const addAchievements = async (req, res) => {
  try {
    let { property_id, oldAchievements } = req.body;
    oldAchievements = Array.isArray(oldAchievements) ? oldAchievements : [];
    const achievements = oldAchievements;

    if (req?.files?.achievements && req.files.achievements.length > 0) {
      for (let i = 0; i < req.files.achievements.length; i++) {
        achievements.push(req.files.achievements[i]?.path);
        achievements.push(req.files.achievements[i]?.originalPath);
      }
    }

    const isProperty = await Achievements.findOne({ property_id: property_id });

    if (isProperty) {
      const updateAchievements = await Achievements.findOneAndUpdate(
        { property_id: property_id },
        {
          $set: {
            achievements,
          },
        },
        { new: true }
      );
      if (updateAchievements) {
        return res
          .status(200)
          .json({ message: "Achievement Added Successfullu" });
      }
    }

    const lastAchievements = await Achievements.findOne().sort({ _id: -1 });
    const id = lastAchievements ? lastAchievements.uniqueId + 1 : 1;

    const newAchievements = Achievements({
      uniqueId: id,
      property_id: property_id,
      achievements: achievements,
    });

    const savedUser = await newAchievements.save();

    if (savedUser) {
      return res
        .status(200)
        .json({ message: "Achievement saved Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAchievementsByPropertyId = async (req, res) => {
  try {
    const { property_id } = req.params;

    const id = Number(property_id);

    const achievements = await Achievements.findOne({
      property_id: id,
    });

    return res.status(200).json(achievements);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
