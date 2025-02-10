import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";
import Teachers from "../../models/Teachers.js";

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
        const profilePath = teacher.profile.split("\\");
        const profile = profilePath[profilePath.length - 1];

        const teacherProfilePath = path.resolve(`./images/${profile}`);

        let teacherMoved = false;

        const destinationDir = path.resolve(
          `./folders/${item.uniqueId}/teachers/`
        );

        try {
          await fs.mkdir(destinationDir, { recursive: true });

          if (await fileExists(teacherProfilePath)) {
            await fs.rename(
              teacherProfilePath,
              path.join(destinationDir, profile)
            );

            teacherMoved = true;

            if (teacherMoved) {
              await Teachers.findOneAndUpdate(
                { uniqueId: teacher.uniqueId },
                {
                  $set: {
                    profile: `folders/${item.uniqueId}/teachers/${profile}`,
                  },
                },
                { new: true }
              );
            }
          }
        } catch (error) {
          console.error(`Error moving files for ${teacher.uniqueId}:`, error);
        }
      });
    }
  } catch (error) {}
};
