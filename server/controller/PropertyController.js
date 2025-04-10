import { MainImageMover } from "../helper/FolderCleaners/PropertyImageMover.js";
import Achievements from "../models/Achievements.js";
import Amenities from "../models/Ameniteis.js";
import ArchiveEnquiry from "../models/ArchiveEnquiry.js";
import BusinessHour from "../models/BusinessHour.js";
import Enquiry from "../models/Enquiry.js";
import Faqs from "../models/Faqs.js";
import Gallery from "../models/Gallery.js";
import Location from "../models/Location.js";
import Property from "../models/Property.js";
import PropertyCourse from "../models/PropertyCourse.js";
import Review from "../models/Reviews.js";
import Seo from "../models/Seo.js";
import Teachers from "../models/Teachers.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export const addProperty = async (req, res) => {
  try {
    let {
      userId,
      property_name,
      property_email,
      property_mobile_no,
      category,
      property_type,
      property_description,
    } = req.body;

    if (property_name) {
      property_name = property_name.trim().replace(/\s+/g, " ");
    }

    const existingProperty = await Property.findOne({
      $or: [
        { property_email },
        { property_mobile_no: `+${property_mobile_no}` },
      ],
    });

    if (existingProperty) {
      if (existingProperty.property_email === property_email) {
        return res.status(400).json({
          error: "Property with the same email already exists.",
        });
      }
      if (existingProperty.property_mobile_no === `+${property_mobile_no}`) {
        return res.status(400).json({
          error: "Property with the same mobile number already exists.",
        });
      }
    }

    let baseSlug = property_name.toLowerCase().replace(/ /g, "-");
    let slug = baseSlug;
    let count = 2;

    while (await Property.findOne({ property_slug: slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const original_property_logo =
      req?.files?.["property_logo"]?.[0]?.originalFilename || null;
    const original_feature_image =
      req?.files?.["featured_image"]?.[0]?.originalFilename || null;
    const property_logo = req?.files?.["property_logo"]?.[0]?.filename || null;
    const featured_image =
      req?.files?.["featured_image"]?.[0]?.filename || null;

    const lastProperty = await Property.findOne().sort({ _id: -1 }).limit(1);
    const uniqueId = lastProperty ? lastProperty.uniqueId + 1 : 100000;

    const newProperty = new Property({
      uniqueId,
      userId,
      property_name,
      property_email,
      property_mobile_no: `+${property_mobile_no}`,
      category,
      property_type,
      property_logo: property_logo
        ? [property_logo, original_property_logo]
        : [],
      featured_image: featured_image
        ? [featured_image, original_feature_image]
        : [],
      property_description,
      property_slug: slug,
    });

    const location = new Location({ property_id: uniqueId });
    await newProperty.save();
    await location.save();

    return res.json({ message: "Property added successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getProperty = async (req, res) => {
  try {
    const property = await Property.find();
    return res.status(200).json(property);
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};

export const getPropertyByUniqueId = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const property = await Property.findOne({ uniqueId: uniqueId });
    return res.status(200).json(property);
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const property = await Property.findOne({ _id: objectId });
    return res.status(200).json(property);
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};

export const getPropertyBySlug = async (req, res) => {
  try {
    const property_slug = req.params.property_slug;
    const property = await Property.findOne({ property_slug: property_slug });
    return res.status(200).json(property);
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};
export const updateProperty = async (req, res) => {
  try {
    const objectId = req.params.objectId;

    if (!objectId) {
      return res.status(400).json({ error: "Missing objectId." });
    }

    const {
      property_name,
      property_email,
      property_mobile_no,
      property_alt_mobile_no,
      property_description,
      est_year,
      category,
      status,
      property_type,
      property_website,
    } = req.body;

    const updatedFields = {
      property_name,
      property_email,
      property_mobile_no,
      property_description,
      est_year,
      category,
      status,
      property_type,
      property_website,
    };

    if (property_alt_mobile_no) {
      updatedFields.property_alt_mobile_no = `+${property_alt_mobile_no}`;
    }

    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] === undefined || updatedFields[key] === null) {
        delete updatedFields[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update." });
    }

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: objectId },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found." });
    }

    return res.json({
      message: "Property updated successfully.",
      result: updatedProperty,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const deleteProperty = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const property = await Property.findById(objectId);

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    const uniqueId = property.uniqueId;
    const propertyFolder = path.join(__dirname, `../../media/${uniqueId}`);

    await Promise.all([
      Property.findByIdAndDelete(objectId),
      Teachers.deleteMany({ property_id: uniqueId }),
      Gallery.deleteMany({ propertyId: uniqueId }),
      Review.deleteMany({ property_id: uniqueId }),
      PropertyCourse.deleteMany({ property_id: uniqueId }),
      Seo.deleteMany({ property_id: uniqueId }),
      Faqs.deleteMany({ property_id: uniqueId }),
      Achievements.deleteMany({ property_id: uniqueId }),
      BusinessHour.deleteMany({ property_id: uniqueId }),
      Enquiry.deleteMany({ property_id: uniqueId }),
      ArchiveEnquiry.deleteMany({ property_id: uniqueId }),
      Amenities.deleteMany({ propertyId: uniqueId }),
      Location.deleteMany({ property_id: uniqueId }),
    ]);

    try {
      const folderExists = await fs
        .stat(propertyFolder)
        .then(() => true)
        .catch(() => false);

      if (folderExists) {
        await fs.rm(propertyFolder, { recursive: true, force: true });
      }
    } catch (fsError) {
      console.error("Error while deleting folder:", fsError.message);
    }

    return res.json({
      message: "Property and all associated data deleted successfully.",
    });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const updatePropertyImages = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const property = await Property.findById(objectId);

    if (!property) {
      return res.status(404).send({ error: "Property not found!" });
    }

    const iconFile = req.files?.["property_logo"]?.[0];
    const featuredFile = req.files?.["featured_image"]?.[0];

    const updates = {};

    if (iconFile) {
      updates.property_logo = [
        iconFile.webpFilename,
        iconFile.originalFilename,
      ];
    }

    if (featuredFile) {
      updates.featured_image = [
        featuredFile.webpFilename,
        featuredFile.originalFilename,
      ];
    }

    if (Object.keys(updates).length > 0) {
      await Property.findByIdAndUpdate(objectId, { $set: updates });
    }

    if (iconFile) {
      await MainImageMover(req, res, property.uniqueId, "property_logo");
    }

    if (featuredFile) {
      await MainImageMover(req, res, property.uniqueId, "featured_image");
    }

    return res.status(200).send({ message: "Images updated successfully." });
  } catch (err) {
    console.error("Error updating property images:", err);
    return res.status(500).send({ error: "Internal Server Error." });
  }
};
