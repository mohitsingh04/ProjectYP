import path from "path";
import { AchievementImageMover } from "../helper/FolderCleaners/PropertyImageMover.js";
import Achievements from "../models/Achievements.js";

export const addAchievements = async (req, res) => {
  try {
    const { property_id } = req.body;

    let achievements = [];

    if (req?.files?.achievements && req.files.achievements.length > 0) {
      const files = req.files.achievements;

      if (files.length > 8) {
        return res
          .status(400)
          .json({ message: "Only 8 achievement image pairs are allowed." });
      }

      for (const file of files) {
        if (file?.filename && file?.webpFilename) {
          achievements.push(file.filename);
          achievements.push(file.webpFilename);
        } else {
          console.warn("Skipping incomplete file pair:", file);
        }
      }

      if (achievements.length % 2 !== 0) {
        return res.status(400).json({
          message: "Uneven number of original and webp images detected.",
        });
      }
    }

    const existing = await Achievements.findOne({ property_id });
    if (existing) {
      return res.status(400).json({
        message: "Achievements already exist for this property.",
      });
    }

    const lastAchievements = await Achievements.findOne().sort({ _id: -1 });
    const uniqueId = lastAchievements ? lastAchievements.uniqueId + 1 : 1;

    const newAchievements = new Achievements({
      uniqueId,
      property_id,
      achievements,
    });

    const saved = await newAchievements.save();

    await AchievementImageMover(req, res, property_id);

    return res
      .status(200)
      .json({ message: "Achievements added successfully", data: saved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
export const addNewAchievement = async (req, res) => {
  try {
    const { property_id } = req.params;

    let newAchievements = [];

    if (req?.files?.achievements && req.files.achievements.length > 0) {
      for (const file of req.files.achievements) {
        if (file?.filename && file?.webpFilename) {
          newAchievements.push(file.filename);
          newAchievements.push(file.webpFilename);
        } else {
          console.warn("Skipping incomplete file pair:", file);
        }
      }

      if (newAchievements.length % 2 !== 0) {
        return res.status(400).json({
          message: "Uneven number of original and webp images detected.",
        });
      }
    }

    if (newAchievements.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid achievements provided." });
    }

    const existing = await Achievements.findOne({ property_id });
    if (!existing) {
      return res.status(404).json({
        message:
          "No achievements found for this property. Use the 'addAchievements' controller to create the initial record.",
      });
    }

    const currentCount = existing.achievements.length;
    const total = currentCount + newAchievements.length;

    if (total > 16) {
      return res.status(400).json({
        message: `Cannot add more than 8 achievement image pairs. You already have ${
          currentCount / 2
        }.`,
      });
    }

    existing.achievements.push(...newAchievements);

    const updated = await existing.save();

    await AchievementImageMover(req, res, property_id);

    return res
      .status(200)
      .json({ message: "New achievements added successfully", data: updated });
  } catch (error) {
    console.error(error);
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
export const removeAchievement = async (req, res) => {
  try {
    const { property_id } = req.params;
    const { webpPaths } = req.body;

    if (!Array.isArray(webpPaths) || webpPaths.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty image path array." });
    }

    const achievement = await Achievements.findOne({ property_id });
    if (!achievement) {
      return res
        .status(404)
        .json({ message: "No achievements found for this property." });
    }

    const pathsToRemove = new Set();

    for (const webpPath of webpPaths) {
      pathsToRemove.add(webpPath);

      const webpFileName = path.basename(webpPath);
      const folderPath = path.dirname(webpPath);

      const match = webpFileName.match(/^img-\d+-(.+)-compressed\.webp$/);
      if (!match) {
        console.warn(`Filename pattern not matched for: ${webpFileName}`);
        continue;
      }

      const fileKey = match[1];

      const originalPath = achievement.achievements.find((p) => {
        const filename = path.basename(p);
        const dir = path.dirname(p);
        const origMatch = filename.match(/^img-\d+-(.+)\.[a-zA-Z0-9]+$/);

        return (
          dir === folderPath &&
          origMatch &&
          origMatch[1] === fileKey &&
          !filename.endsWith(".webp")
        );
      });

      if (originalPath) {
        pathsToRemove.add(originalPath);
        console.log(`Found original for ${webpFileName}: ${originalPath}`);
      } else {
        console.warn(`Original file not found for key: ${fileKey}`);
      }
    }

    const updatedAchievements = achievement.achievements.filter(
      (img) => !pathsToRemove.has(img)
    );

    achievement.achievements = updatedAchievements;
    await achievement.save();

    return res.status(200).json({
      message: "Selected achievement image references removed from database.",
      data: achievement,
    });
  } catch (error) {
    console.error("Error removing achievements:", error);
    return res.status(500).json({ message: error.message });
  }
};
