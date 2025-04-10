import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Property from "../../models/Property.js";
import Teachers from "../../models/Teachers.js";
import Gallery from "../../models/Gallery.js";
import Achievements from "../../models/Achievements.js";
import Hostel from "../../models/Hostel.js";

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};
export const MainImageMover = async (req, res, propertyId, fieldName) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const oldDir = path.join(__dirname, "../../images");
    const newDir = path.join(__dirname, `../../../media/${propertyId}/main`);
    await fs.mkdir(newDir, { recursive: true });

    const property = await Property.findOne({ uniqueId: propertyId });
    if (!property) {
      console.warn(`Property not found for ID: ${propertyId}`);
      return;
    }

    if (!["property_logo", "featured_image"].includes(fieldName)) {
      console.warn(`Invalid field name: ${fieldName}`);
      return;
    }

    const imageArray = property[fieldName];
    if (!Array.isArray(imageArray) || imageArray.length === 0) {
      console.warn(`No images found in field: ${fieldName}`);
      return;
    }

    const updatedImagePaths = [];
    const skippedFiles = [];

    for (const imgPath of imageArray) {
      const imgName = imgPath.split(/\\|\//).pop();

      // If already moved
      if (imgPath.startsWith(`${propertyId}/main/`)) {
        updatedImagePaths.push(imgPath);
        continue;
      }

      const oldPath = path.join(oldDir, imgName);
      const newPath = path.join(newDir, imgName);

      if (await fileExists(oldPath)) {
        try {
          await fs.rename(oldPath, newPath);
          updatedImagePaths.push(`${propertyId}/main/${imgName}`);
        } catch (err) {
          console.warn(`Failed to move ${imgName}: ${err.message}`);
          skippedFiles.push(imgName);
        }
      } else {
        console.warn(`File not found: ${oldPath}`);
        skippedFiles.push(imgName);
      }
    }

    if (updatedImagePaths.length > 0) {
      property[fieldName] = updatedImagePaths;
      await property.save();
      console.log(`${fieldName} images for property ${propertyId} updated.`);

      if (skippedFiles.length > 0) {
        console.warn(`Some files were skipped: ${skippedFiles.join(", ")}`);
      }
    } else {
      console.warn(`No files were moved. Nothing saved for ${fieldName}`);
    }
  } catch (error) {
    console.error("Error in MainImageMover:", error);
  }
};

export const GalleryImageMover = async (req, res, propertyId) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const oldDir = path.join(__dirname, "../../images");
    const newDir = path.join(__dirname, `../../../media/${propertyId}/gallery`);
    await fs.mkdir(newDir, { recursive: true });

    const property = await Property.findOne({ uniqueId: propertyId });
    if (!property) {
      console.warn(`Property not found for ID: ${propertyId}`);
      return;
    }

    const galleryEntries = await Gallery.find({ propertyId: propertyId });

    for (const gallery of galleryEntries) {
      if (!Array.isArray(gallery.gallery)) continue;

      const updatedGalleryPaths = [];

      for (const imgPath of gallery.gallery) {
        const imgName = imgPath.split(/\\|\//).pop();

        if (imgPath.startsWith(`${propertyId}/gallery/`)) {
          updatedGalleryPaths.push(imgPath);
          continue;
        }

        const oldPath = path.join(oldDir, imgName);
        const newPath = path.join(newDir, imgName);

        if (await fileExists(oldPath)) {
          try {
            await fs.rename(oldPath, newPath);
            updatedGalleryPaths.push(`${propertyId}/gallery/${imgName}`);
          } catch (moveErr) {
            console.warn(`Failed to move ${imgName}: ${moveErr.message}`);
          }
        } else {
          console.warn(`File not found: ${oldPath}`);
        }
      }

      if (updatedGalleryPaths.length === gallery.gallery.length) {
        gallery.gallery = updatedGalleryPaths;
        await gallery.save();
      }
    }

    console.log(
      `Gallery images for property ${propertyId} moved successfully.`
    );
  } catch (error) {
    console.error("Error in GalleryImageMover:", error);
  }
};

export const HostelImageMover = async (req, res, propertyId) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const oldDir = path.join(__dirname, "../../images");
    const newDir = path.join(__dirname, `../../../media/${propertyId}/hostel`);
    await fs.mkdir(newDir, { recursive: true });

    const property = await Property.findOne({ uniqueId: propertyId });
    if (!property) {
      console.warn(`Property not found for ID: ${propertyId}`);
      return;
    }

    const hostels = await Hostel.find({ property_id: propertyId });

    for (const hostel of hostels) {
      if (!Array.isArray(hostel.hostel_images)) continue;

      const updatedImagePaths = [];

      for (const imgPath of hostel.hostel_images) {
        const imgName = imgPath.split(/\\|\//).pop();

        if (imgPath.startsWith(`${propertyId}/hostel/`)) {
          updatedImagePaths.push(imgPath);
          continue;
        }

        const oldPath = path.join(oldDir, imgName);
        const newPath = path.join(newDir, imgName);

        if (await fileExists(oldPath)) {
          try {
            await fs.rename(oldPath, newPath);
            updatedImagePaths.push(`${propertyId}/hostel/${imgName}`);
          } catch (moveErr) {
            console.warn(`Failed to move ${imgName}: ${moveErr.message}`);
          }
        } else {
          console.warn(`File not found: ${oldPath}`);
        }
      }

      if (updatedImagePaths.length === hostel.hostel_images.length) {
        hostel.hostel_images = updatedImagePaths;
        await hostel.save();
      }
    }

    console.log(`Hostel images for property ${propertyId} moved successfully.`);
  } catch (error) {
    console.error("Error in HostelImageMover:", error);
  }
};

export const AchievementImageMover = async (req, res, property_id) => {
  try {
    const achievementData = await Achievements.findOne({ property_id });
    if (!achievementData || !Array.isArray(achievementData.achievements)) {
      console.warn(
        `No valid achievements found for property_id: ${property_id}`
      );
      return;
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const oldDir = path.join(__dirname, "../../images");
    const newDir = path.join(
      __dirname,
      `../../../media/${property_id}/achievements`
    );
    await fs.mkdir(newDir, { recursive: true });

    const updatedPaths = [];

    for (const imageName of achievementData.achievements) {
      if (imageName.startsWith(`/${property_id}/achievements/`)) {
        updatedPaths.push(imageName);
        continue;
      }

      const oldPath = path.join(oldDir, imageName);
      const newPath = path.join(newDir, imageName);

      if (await fileExists(oldPath)) {
        try {
          await fs.rename(oldPath, newPath);
          updatedPaths.push(`/${property_id}/achievements/${imageName}`);
        } catch (moveErr) {
          console.warn(`Failed to move ${imageName}: ${moveErr.message}`);
        }
      } else {
        console.warn(`File not found: ${oldPath}`);
      }
    }

    achievementData.achievements = updatedPaths;
    await achievementData.save();

    console.log("Images moved and database updated successfully.");
  } catch (error) {
    console.error("Error in AchievementImageMover:", error);
  }
};

export const TeacherImageMover = async (req, res, propertyId) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const oldDir = path.join(__dirname, "../../images");
    const newDir = path.join(
      __dirname,
      `../../../media/${propertyId}/teachers`
    );
    await fs.mkdir(newDir, { recursive: true });

    const teachers = await Teachers.find({ property_id: propertyId });

    for (const teacher of teachers) {
      const newProfilePaths = [];
      const skippedFiles = [];

      for (const imgPath of teacher.profile) {
        const imgName = imgPath.split(/\\|\//).pop();

        if (imgPath.startsWith(`${propertyId}/teachers/`)) {
          newProfilePaths.push(imgPath); // already moved
          continue;
        }

        const oldPath = path.join(oldDir, imgName);
        const newPath = path.join(newDir, imgName);

        if (await fileExists(oldPath)) {
          try {
            await fs.rename(oldPath, newPath);
            newProfilePaths.push(`${propertyId}/teachers/${imgName}`);
          } catch (err) {
            console.warn(`Failed to move ${imgName}: ${err.message}`);
            skippedFiles.push(imgName);
          }
        } else {
          console.warn(`File not found: ${oldPath}`);
          skippedFiles.push(imgName);
        }
      }

      // Only update if we moved both
      if (newProfilePaths.length === 2) {
        teacher.profile = newProfilePaths;
        await teacher.save();
        console.log(`Updated teacher ${teacher.teacher_name}`);
      } else {
        console.warn(
          `Mismatch in profile image count for ${teacher.teacher_name}. Expected 2, got ${newProfilePaths.length}`
        );
      }
    }

    console.log(
      `Teacher images moved successfully for property: ${propertyId}`
    );
  } catch (error) {
    console.error("Error in TeacherImageMover:", error);
  }
};
