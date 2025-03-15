import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";
import Teachers from "../../models/Teachers.js";

const TeacherFolderCleaner = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperty = await Property.find();

    allProperty.forEach(async (item) => {
      const unKnownFiles = path.join(
        __dirname,
        `../../Folders/${item.uniqueId}/teachers`
      );

      const filesInFolder = await fs.readdir(unKnownFiles);

      const AllTeachers = await Teachers.find({ property_id: item.uniqueId });

      let files = [];

      AllTeachers.map((item) => {
        const img = item.profile.split("\\");
        files.push(img[img.length - 1]);
      });

      for (const file of filesInFolder) {
        if (!files.includes(file)) {
          const filePath = path.join(unKnownFiles, file);

          await fs.unlink(filePath);
          console.log(`Deleting Uploaded File`);
        }
      }
    });
  } catch (error) {
    console.log("Internal Server Error");
  }
};

export default TeacherFolderCleaner;
