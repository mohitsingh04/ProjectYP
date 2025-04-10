import { HostelImageMover } from "../helper/FolderCleaners/PropertyImageMover.js";
import Hostel from "../models/Hostel.js";
import path from "path";

export const AddHostel = async (req, res) => {
  try {
    const {
      userId,
      property_id,
      hostel_name,
      hostel_price,
      hostel_description,
    } = req.body;

    const existingHostel = await Hostel.findOne({
      property_id,
      hostel_name: { $regex: new RegExp(`^${hostel_name}$`, "i") },
    });

    if (existingHostel) {
      return res.status(400).json({
        error: "A hostel with the same name already exists for this property.",
      });
    }

    const lastHostel = await Hostel.findOne().sort({ uniqueId: -1 });
    let newUniqueId = "1";
    if (lastHostel && lastHostel.uniqueId) {
      newUniqueId = String(Number(lastHostel.uniqueId) + 1);
    }

    const newHostel = new Hostel({
      uniqueId: newUniqueId,
      hostel_name,
      hostel_price,
      hostel_description,
      userId,
      property_id,
      hostel_images: [],
    });

    await newHostel.save();

    return res.status(201).json({
      message: "Hostel created successfully",
      hostel: newHostel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getHostelByPropertyId = async (req, res) => {
  try {
    const { property_id } = req.params;
    const hostel = await Hostel.find({ property_id: property_id });
    if (!hostel) {
      return res.status(404).json({ error: "Hostel Not Found" });
    }

    return res.status(200).json(hostel);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const EditHostel = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { property_id, hostel_name, hostel_price, hostel_description } =
      req.body;

    const hostel = await Hostel.findOne({ uniqueId });
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found." });
    }

    const duplicateHostel = await Hostel.findOne({
      uniqueId: { $ne: uniqueId },
      property_id,
      hostel_name: { $regex: new RegExp(`^${hostel_name}$`, "i") },
    });

    if (duplicateHostel) {
      return res.status(400).json({
        error:
          "Another hostel with the same name already exists for this property.",
      });
    }

    hostel.property_id = property_id;
    hostel.hostel_name = hostel_name;
    hostel.hostel_price = hostel_price;
    hostel.hostel_description = hostel_description;

    await hostel.save();

    return res.status(200).json({
      message: "Hostel updated successfully",
      hostel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addHostelImages = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    let newImages = [];

    if (req?.files?.images && req.files.images.length > 0) {
      for (const file of req.files.images) {
        if (file?.filename && file?.webpFilename) {
          newImages.push(file.filename);
          newImages.push(file.webpFilename);
        } else {
          console.warn("Skipping incomplete image pair:", file);
        }
      }

      if (newImages.length % 2 !== 0) {
        return res.status(400).json({
          message: "Uneven number of original and webp images detected.",
        });
      }
    }

    if (newImages.length === 0) {
      return res.status(400).json({
        message: "No valid hostel images provided.",
      });
    }

    const existingHostel = await Hostel.findOne({ uniqueId });
    if (!existingHostel) {
      return res.status(404).json({
        message: "Hostel not found with the given uniqueId.",
      });
    }

    const currentCount = existingHostel.hostel_images.length;
    const total = currentCount + newImages.length;

    if (total > 16) {
      return res.status(400).json({
        message: `Cannot add more than 8 image pairs (16 files). Currently have ${
          currentCount / 2
        } pairs.`,
      });
    }

    existingHostel.hostel_images.push(...newImages);

    const updatedHostel = await existingHostel.save();

    // Move images using property_id
    await HostelImageMover(req, res, existingHostel.property_id);

    return res.status(200).json({
      message: "Hostel images added successfully.",
      data: updatedHostel,
    });
  } catch (error) {
    console.error("Error adding hostel images:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const removeHostelImages = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { webpPaths } = req.body;

    if (!Array.isArray(webpPaths) || webpPaths.length === 0) {
      return res.status(400).json({
        message: "Invalid or empty image path array.",
      });
    }

    const hostel = await Hostel.findOne({ uniqueId });
    if (!hostel) {
      return res.status(404).json({
        message: "No hostel found for this uniqueId.",
      });
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

      const originalPath = hostel.hostel_images.find((p) => {
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

    const updatedImages = hostel.hostel_images.filter(
      (img) => !pathsToRemove.has(img)
    );

    hostel.hostel_images = updatedImages;
    await hostel.save();

    return res.status(200).json({
      message: "Selected hostel images removed from database.",
      hostel: hostel,
    });
  } catch (error) {
    console.error("Error removing hostel images:", error);
    return res.status(500).json({ message: error.message });
  }
};
