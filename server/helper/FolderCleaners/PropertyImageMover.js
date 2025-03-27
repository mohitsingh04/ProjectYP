import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";
import Teachers from "../../models/Teachers.js";
import Gallery from "../../models/Gallery.js";
import Achievements from "../../models/Achievements.js";
import Course from "../../models/Courses.js";
import Category from "../../models/Category.js";
import User from "../../models/Users.js";

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
        `./images/${item.property_logo[0]}`
      );
      const featuredImagePathCompressed = path.resolve(
        `./images/${item.featured_image[0]}`
      );
      const iconPathOriginal = path.resolve(
        `./images/${item.property_logo[1]}`
      );
      const featuredImagePathOriginal = path.resolve(
        `./images/${item.featured_image[1]}`
      );

      const destinationDir = path.resolve(`./../media/${item.uniqueId}/main/`);
      try {
        await fs.mkdir(destinationDir, { recursive: true });

        const iconPathMoved = [];
        const featuredPathMoved = [];

        if (await fileExists(iconPathCompressed)) {
          await fs.rename(
            iconPathCompressed,
            path.join(destinationDir, item.property_logo[0])
          );

          iconPathMoved.push(`${item.uniqueId}/main/${item.property_logo[0]}`);
        }
        if (await fileExists(featuredImagePathCompressed)) {
          await fs.rename(
            featuredImagePathCompressed,
            path.join(destinationDir, item.featured_image[0])
          );
          featuredPathMoved.push(
            `${item.uniqueId}/main/${item.featured_image[0]}`
          );
        }
        if (await fileExists(iconPathOriginal)) {
          await fs.rename(
            iconPathOriginal,
            path.join(destinationDir, item.property_logo[1])
          );
          iconPathMoved.push(`${item.uniqueId}/main/${item.property_logo[1]}`);
        }
        if (await fileExists(featuredImagePathOriginal)) {
          await fs.rename(
            featuredImagePathOriginal,
            path.join(destinationDir, item.featured_image[1])
          );
          featuredPathMoved.push(
            `${item.uniqueId}/main/${item.featured_image[1]}`
          );
        }

        if (iconPathMoved && iconPathMoved.length === 2) {
          await Property.findOneAndUpdate(
            { uniqueId: item.uniqueId },
            {
              $set: {
                property_logo: iconPathMoved,
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
        console.error(`Error moving files`);
      }
    }
  } catch (error) {
    console.error("Error in PropertyImageMover");
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
          `./../media/${item.uniqueId}/teachers/`
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

            teacherMoved.push(`${item.uniqueId}/teachers/${profile}`);
          }
          if (await fileExists(teacherProfilePathOriginal)) {
            const image = teacherProfilePathOriginal.split("\\");
            const profile = image[image.length - 1];

            await fs.rename(
              teacherProfilePathOriginal,
              path.join(destinationDir, profile)
            );

            teacherMoved.push(`${item.uniqueId}/teachers/${profile}`);
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
          console.error(`Error moving files`);
        }
      });
    }
  } catch (error) {
    console.log("Internal Server Error");
  }
};
export const GalleryImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const allProperties = await Property.find();

    for (const item of allProperties) {
      const galleryImages = await Gallery.find({ propertyId: item.uniqueId });
      const destinationDir = path.resolve(
        `./../media/${item.uniqueId}/gallery/`
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

          if (img.startsWith(`${item.uniqueId}/gallery/`)) {
            oldImages.push(img);
          }

          if (await fileExists(GalleryImagePath)) {
            await fs.rename(GalleryImagePath, newImagePath);
            movedImages.push(`${item.uniqueId}/gallery/${profile}`);
          }
        }

        oldImages.map((i) => {
          movedImages.push(i);
        });

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
    console.error("Error moving gallery images");
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
          `./../media/${item.uniqueId}/achievements/`
        );

        await fs.mkdir(destinationDir, { recursive: true });

        for (const img of info.achievements) {
          const image = img.split(`\\`);
          const profile = image[image.length - 1];
          const AchievementImagePath = path.resolve(`./images/${profile}`);

          if (img.startsWith(`${item.uniqueId}/achievements/`)) {
            oldImages.push(img);
          }

          if (await fileExists(AchievementImagePath)) {
            await fs.rename(
              AchievementImagePath,
              path.join(destinationDir, profile)
            );

            movedImages.push(`${item.uniqueId}/achievements/${profile}`);
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
    console.error("Error moving achievement images");
  }
};
export const CourseImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const destinationDir = path.resolve("./../media/course/");

    const allCourses = await Course.find();

    for (const course of allCourses) {
      let movedImages = [];

      const imagePath = path.resolve(`./${course.image[0]}`);
      const imagePathOriginal = path.resolve(`./${course.image[1]}`);

      await fs.mkdir(destinationDir, { recursive: true });

      if (await fileExists(imagePath)) {
        const profile = path.basename(imagePath);
        await fs.rename(imagePath, path.join(destinationDir, profile));
        movedImages.push(`course/${profile}`);
      }

      if (await fileExists(imagePathOriginal)) {
        const profile = path.basename(imagePathOriginal);
        await fs.rename(imagePathOriginal, path.join(destinationDir, profile));
        movedImages.push(`course/${profile}`);
      }

      if (movedImages.length > 0) {
        await Course.findOneAndUpdate(
          { uniqueId: course.uniqueId },
          { $set: { image: movedImages } },
          { new: true }
        );
      }
    }
  } catch (error) {
    console.error("Internal Error");
  }
};

export const CategoryImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const destinationDir = path.resolve("./../media/category/");

    const allCategory = await Category.find();

    for (const category of allCategory) {
      let iconMoved = [];
      let featureMoved = [];

      const iconPath = path.resolve(`./${category.category_icon[0]}`);
      const iconPathOriginal = path.resolve(`./${category.category_icon[1]}`);

      const featurePath = path.resolve(`./${category.featured_image[0]}`);
      const featurePathOriginal = path.resolve(
        `./${category.featured_image[1]}`
      );

      await fs.mkdir(destinationDir, { recursive: true });

      if (await fileExists(iconPath)) {
        const profile = path.basename(iconPath);
        await fs.rename(iconPath, path.join(destinationDir, profile));
        iconMoved.push(`category/${profile}`);
      }

      if (await fileExists(iconPathOriginal)) {
        const profile = path.basename(iconPathOriginal);
        await fs.rename(iconPathOriginal, path.join(destinationDir, profile));
        iconMoved.push(`category/${profile}`);
      }

      if (await fileExists(featurePath)) {
        const profile = path.basename(featurePath);
        await fs.rename(featurePath, path.join(destinationDir, profile));
        featureMoved.push(`category/${profile}`);
      }

      if (await fileExists(featurePathOriginal)) {
        const profile = path.basename(featurePathOriginal);
        await fs.rename(
          featurePathOriginal,
          path.join(destinationDir, profile)
        );
        featureMoved.push(`category/${profile}`);
      }

      if (iconMoved.length > 0) {
        await Category.findOneAndUpdate(
          { uniqueId: category.uniqueId },
          { $set: { category_icon: iconMoved } },
          { new: true }
        );
      }
      if (featureMoved.length > 0) {
        await Category.findOneAndUpdate(
          { uniqueId: category.uniqueId },
          { $set: { featured_image: featureMoved } },
          { new: true }
        );
      }
    }
  } catch (error) {
    console.error("Internal Error");
  }
};

export const UserImageMover = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const destinationDir = path.resolve("./../media/users/");

    const allUser = await User.find();

    for (const user of allUser) {
      let movedImages = [];

      const imagePath = path.resolve(`./${user.profile[0]}`);
      const imagePathOriginal = path.resolve(`./${user.profile[1]}`);

      await fs.mkdir(destinationDir, { recursive: true });

      if (await fileExists(imagePath)) {
        const profile = path.basename(imagePath);
        await fs.rename(imagePath, path.join(destinationDir, profile));
        movedImages.push(`users/${profile}`);
      }

      if (await fileExists(imagePathOriginal)) {
        const profile = path.basename(imagePathOriginal);
        await fs.rename(imagePathOriginal, path.join(destinationDir, profile));
        movedImages.push(`users/${profile}`);
      }

      if (movedImages.length > 0) {
        await User.findOneAndUpdate(
          { uniqueId: user.uniqueId },
          { $set: { profile: movedImages } },
          { new: true }
        );
      }
    }
  } catch (error) {
    console.error("Internal Error");
  }
};
