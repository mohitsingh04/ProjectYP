import Gallery from "../../models/Gallery.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";

const GalleryFolderCleaner = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperty = await Property.find();

    allProperty.forEach(async (item) => {
      const unKnownFiles = path.join(
        __dirname,
        `../../Folders/${item.uniqueId}/gallery`
      );

      const filesInFolder = await fs.readdir(unKnownFiles);

      const AllGallery = await Gallery.find({ propertyId: item.uniqueId });

      let files = [];

      AllGallery.map((item) => {
        item.gallery.map((img) => {
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

export default GalleryFolderCleaner;
