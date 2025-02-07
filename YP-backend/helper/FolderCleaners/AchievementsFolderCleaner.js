import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";
import Achievements from "../../models/Achievements.js";

const AchievementsFolderCleaner = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperty = await Property.find();

    allProperty.forEach(async (item) => {
      const unKnownFiles = path.join(
        __dirname,
        `../../Folders/${item.uniqueId}/achievements`
      );

      const filesInFolder = await fs.readdir(unKnownFiles);

      const allAchievements = await Achievements.find();

      let files = [];

      allAchievements.map((item) => {
        item.achievements.map((img) => {
          const x = img.split("\\");
          files.push(x[x.length - 1]);
        });
      });

      for (const file of filesInFolder) {
        if (!files.includes(file)) {
          const filePath = path.join(unKnownFiles, file);

          await fs.unlink(filePath);
          console.log(`Deleting Uploaded File: ${filePath}`);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default AchievementsFolderCleaner;
