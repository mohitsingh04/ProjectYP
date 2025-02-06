import Course from "../../models/Courses.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import User from "../../models/Users.js";
import Category from "../../models/Category.js";
import Property from "../../models/Property.js";
import Teachers from "../../models/Teachers.js";
import Gallery from "../../models/Gallery.js";

const handleFolderCleaner = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const unKnownFiles = path.join(__dirname, "../../images");
    const AllCourse = await Course.find();
    const AllUsers = await User.find();
    const AllCategories = await Category.find();
    const AllProperties = await Property.find();
    const AllTeachers = await Teachers.find();
    const AllGallery = await Gallery.find();

    const files = AllCourse.map((file) => path.basename(file.image));
    AllCategories.map((file) => {
      files.push(file.category_icon);
      files.push(file.featured_image);
    });
    AllUsers.map((file) => {
      files.push(file.profile);
    });
    AllUsers.map((file) => {
      files.push(file.profile);
    });
    AllTeachers.map((file) => {
      files.push(file.profile);
    });

    AllGallery.map((file) => {
      file.gallery.map((img) => {
        const x = img.split(`\\`);
        files.push(x[1]);
      });
    });

    AllProperties.map((file) => {
      files.push(file.property_icon);
      files.push(file.featured_image);
    });

    const filesInFolder = await fs.readdir(unKnownFiles);

    for (const file of filesInFolder) {
      if (!files.includes(file)) {
        const filePath = path.join(unKnownFiles, file);
        await fs.unlink(filePath);
        console.log(`Deleting Uploaded File: ${filePath}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default handleFolderCleaner;
