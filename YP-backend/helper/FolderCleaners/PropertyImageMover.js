import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const PropertyImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperties = await Property.find();

    for (const item of allProperties) {
      const iconPath = path.resolve(`./images/${item.property_icon}`);
      const featuredImagePath = path.resolve(`./images/${item.featured_image}`);

      let iconMoved = false;
      let featured_imageMoved = false;

      const destinationDir = path.resolve(`./Folders/${item.uniqueId}/main/`);

      try {
        await fs.mkdir(destinationDir, { recursive: true });

        if (await fileExists(iconPath)) {
          await fs.rename(
            iconPath,
            path.join(destinationDir, item.property_icon)
          );
          iconMoved = true;
          if (iconMoved) {
            await Property.findOneAndUpdate(
              { uniqueId: item.uniqueId },
              {
                $set: {
                  property_icon: `Folders/${item.uniqueId}/main/${item.property_icon}`,
                },
              },
              { new: true }
            );
          }
        }

        if (await fileExists(featuredImagePath)) {
          await fs.rename(
            featuredImagePath,
            path.join(destinationDir, item.featured_image)
          );
          featured_imageMoved = true;
          if (featured_imageMoved) {
            await Property.findOneAndUpdate(
              { uniqueId: item.uniqueId },
              {
                $set: {
                  featured_image: `Folders/${item.uniqueId}/main/${item.featured_image}`,
                },
              },
              { new: true }
            );
          }
        }
      } catch (fileError) {
        console.error(`Error moving files for ${item.uniqueId}:`, fileError);
      }
    }
  } catch (error) {
    console.error("Error in PropertyImageMover:", error);
  }
};

export default PropertyImageMover;
