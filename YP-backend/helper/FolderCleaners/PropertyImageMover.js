import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";
import Teachers from "../../models/Teachers.js";
import Gallery from "../../models/Gallery.js";
import Achievements from "../../models/Achievements.js";

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const PropertyImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperties = await Property.find();

    for (const item of allProperties) {
      const iconPathCompressed = path.resolve(
        `./images/${item.property_icon[0]}`
      );
      const featuredImagePathCompressed = path.resolve(
        `./images/${item.featured_image[0]}`
      );
      const iconPathOriginal = path.resolve(
        `./images/${item.property_icon[1]}`
      );
      const featuredImagePathOriginal = path.resolve(
        `./images/${item.featured_image[1]}`
      );

      const destinationDir = path.resolve(`./folders/${item.uniqueId}/main/`);
      try {
        await fs.mkdir(destinationDir, { recursive: true });

        const iconPathMoved = [];
        const featuredPathMoved = [];

        if (await fileExists(iconPathCompressed)) {
          await fs.rename(
            iconPathCompressed,
            path.join(destinationDir, item.property_icon[0])
          );

          iconPathMoved.push(
            `folders/${item.uniqueId}/main/${item.property_icon[0]}`
          );
        }
        if (await fileExists(featuredImagePathCompressed)) {
          await fs.rename(
            featuredImagePathCompressed,
            path.join(destinationDir, item.featured_image[0])
          );
          featuredPathMoved.push(
            `folders/${item.uniqueId}/main/${item.featured_image[0]}`
          );
        }
        if (await fileExists(iconPathOriginal)) {
          await fs.rename(
            iconPathOriginal,
            path.join(destinationDir, item.property_icon[1])
          );
          iconPathMoved.push(
            `folders/${item.uniqueId}/main/${item.property_icon[1]}`
          );
        }
        if (await fileExists(featuredImagePathOriginal)) {
          await fs.rename(
            featuredImagePathOriginal,
            path.join(destinationDir, item.featured_image[1])
          );
          featuredPathMoved.push(
            `folders/${item.uniqueId}/main/${item.featured_image[1]}`
          );
        }

        if (iconPathMoved && iconPathMoved.length === 2) {
          await Property.findOneAndUpdate(
            { uniqueId: item.uniqueId },
            {
              $set: {
                property_icon: iconPathMoved,
              },
            },
            { new: true }
          );
        }
        if (featuredPathMoved && featuredPathMoved.length === 2) {
          await Property.findOneAndUpdate(
            { uniqueId: item.uniqueId },
            {
              $set: {
                featured_image: featuredPathMoved,
              },
            },
            { new: true }
          );
        }
      } catch (error) {
        console.error(`Error moving files for ${item.uniqueId}:`, error);
      }
    }
  } catch (error) {
    console.error("Error in PropertyImageMover:", error);
  }
};

export const TeacherImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperties = await Property.find();

    for (const item of allProperties) {
      const teachers = await Teachers.find({ property_id: item.uniqueId });

      teachers.map(async (teacher) => {
        const teacherProfilePath = path.resolve(`./${teacher.profile[0]}`);
        const teacherProfilePathOriginal = path.resolve(
          `./${teacher.profile[1]}`
        );

        let teacherMoved = [];

        const destinationDir = path.resolve(
          `./folders/${item.uniqueId}/teachers/`
        );

        try {
          await fs.mkdir(destinationDir, { recursive: true });

          if (await fileExists(teacherProfilePath)) {
            const image = teacherProfilePath.split("\\");
            const profile = image[image.length - 1];

            await fs.rename(
              teacherProfilePath,
              path.join(destinationDir, profile)
            );

            teacherMoved.push(`folders/${item.uniqueId}/teachers/${profile}`);
          }
          if (await fileExists(teacherProfilePathOriginal)) {
            const image = teacherProfilePathOriginal.split("\\");
            const profile = image[image.length - 1];

            await fs.rename(
              teacherProfilePathOriginal,
              path.join(destinationDir, profile)
            );

            teacherMoved.push(`folders/${item.uniqueId}/teachers/${profile}`);
          }

          if (teacherMoved && teacherMoved.length === 2) {
            await Teachers.findOneAndUpdate(
              { uniqueId: teacher.uniqueId },
              {
                $set: {
                  profile: teacherMoved,
                },
              },
              { new: true }
            );
          }
        } catch (error) {
          console.error(`Error moving files for ${teacher.uniqueId}:`, error);
        }
      });
    }
  } catch (error) {}
};
export const GalleryImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperties = await Property.find();

    for (const item of allProperties) {
      const galleryImages = await Gallery.find({ propertyId: item.uniqueId });
      const destinationDir = path.resolve(
        `./folders/${item.uniqueId}/gallery/`
      );

      // Ensure the destination directory exists
      await fs.mkdir(destinationDir, { recursive: true });

      for (const info of galleryImages) {
        let movedImages = [];
        let oldImages = [];

        for (const img of info.gallery) {
          const image = img.split(`\\`);
          const profile = image[image.length - 1];
          const GalleryImagePath = path.resolve(`./images/${profile}`);
          const newImagePath = path.join(destinationDir, profile);

          if (img.startsWith(`folders/${item.uniqueId}/gallery/`)) {
            oldImages.push(img);
          }

          if (await fileExists(GalleryImagePath)) {
            await fs.rename(GalleryImagePath, newImagePath);
            movedImages.push(`folders/${item.uniqueId}/gallery/${profile}`);
          }
        }

        oldImages.map((i) => {
          movedImages.push(i);
        });

        // console.log(movedImages);

        // Update the gallery only if all images are moved
        if (movedImages.length === info.gallery.length) {
          await Gallery.findOneAndUpdate(
            { uniqueId: info.uniqueId },
            { $set: { gallery: movedImages } },
            { new: true }
          );
        }
      }
    }
  } catch (error) {
    console.error("Error moving gallery images:", error);
  }
};

export const AchievementImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperties = await Property.find();

    for (const item of allProperties) {
      const achievementsImages = await Achievements.find({
        property_id: item.uniqueId,
      });

      for (const info of achievementsImages) {
        let movedImages = [];
        let oldImages = [];

        const destinationDir = path.resolve(
          `./folders/${item.uniqueId}/achievements/`
        );

        await fs.mkdir(destinationDir, { recursive: true });

        for (const img of info.achievements) {
          const image = img.split(`\\`);
          const profile = image[image.length - 1];
          const AchievementImagePath = path.resolve(`./images/${profile}`);

          if (img.startsWith(`folders/${item.uniqueId}/achievements/`)) {
            oldImages.push(img);
          }

          if (await fileExists(AchievementImagePath)) {
            console.log("Moving file:", AchievementImagePath);

            await fs.rename(
              AchievementImagePath,
              path.join(destinationDir, profile)
            );

            movedImages.push(
              `folders/${item.uniqueId}/achievements/${profile}`
            );
          }
        }

        oldImages.map((i) => {
          movedImages.push(i);
        });

        if (movedImages.length === info.achievements.length) {
          await Achievements.findOneAndUpdate(
            { uniqueId: info.uniqueId },
            { $set: { achievements: movedImages } },
            { new: true }
          );
        }
      }
    }
  } catch (error) {
    console.error("Error moving achievement images:", error);
  }
};
