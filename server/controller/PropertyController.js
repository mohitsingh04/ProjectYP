import Achievements from "../models/Achievements.js";
import Amenities from "../models/Ameniteis.js";
import ArchiveEnquiry from "../models/ArchiveEnquiry.js";
import BusinessHour from "../models/BusinessHour.js";
import Enquiry from "../models/Enquiry.js";
import Faqs from "../models/Faqs.js";
import Gallery from "../models/Gallery.js";
import Property from "../models/Property.js";
import PropertyCourse from "../models/PropertyCourse.js";
import Review from "../models/Reviews.js";
import Seo from "../models/Seo.js";
import Teachers from "../models/Teachers.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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

export const addProperty = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // const baseFolder = path.join(__dirname, "../Folders");

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

    const slug = property_name.replace(/ /g, "-").toLowerCase();

    const orignal_property_logo =
      req?.files["property_logo"]?.[0]?.originalFilename;
    const orignal_feature_image =
      req?.files["featured_image"]?.[0]?.originalFilename;

    const property_logo = req?.files["property_logo"]?.[0]?.filename;
    const featured_image = req?.files["featured_image"]?.[0]?.filename;

    const property = await Property.findOne().sort({ _id: -1 }).limit(1);
    const existProperty = await Property.findOne({
      property_name: property_name,
    });

    const x = property ? property.uniqueId + 1 :100000;
    const folderPath = path.join(__dirname, `../media/${x}`);
    try {
      await fs.promises.access(folderPath, fs.constants.F_OK);
    } catch (err) {
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) throw err;
      });

      const allSubFolders = ["main", "teachers", "gallery", "achievements"];
      allSubFolders.map((item) => {
        const subFolder = path.join(folderPath, item);
        fs.mkdir(subFolder, { recursive: true }, (err) => {
          if (err) throw err;
        });
      });
    }

    if (!existProperty) {
      const newProperty = new Property({
        uniqueId: x,
        userId,
        property_name,
        property_email,
        property_mobile_no,
        category,
        property_type,
        property_logo: [property_logo, orignal_property_logo],
        featured_image: [featured_image, orignal_feature_image],
        property_description,
        property_slug: slug,
      });
      if (await newProperty.save()) {
        return res.send({ message: "Property added." });
      }
    } else {
      return res.send({ error: "This Property is already exist!" });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    let {
      property_id,
      property_name,
      property_email,
      property_mobile_no,
      property_alt_mobile_no,
      property_description,
      property_address,
      property_pincode,
      property_city,
      property_state,
      property_country,
      property_seo_title,
      property_seo_slug,
      property_seo_meta_tags,
      property_seo_description,
      property_hostel_type,
      property_hostel_description,
      est_year,
      category,
      status,
      property_courses,
      property_type,
    } = req.body;

    if (property_name) {
      property_name = property_name.trim().replace(/\s+/g, " ");
    }

    const property = await Property.findOne({ uniqueId: property_id });
    if (property) {
      await Property.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            property_name,
            property_email,
            property_mobile_no,
            property_alt_mobile_no,
            property_description,
            property_address,
            property_pincode,
            property_city,
            property_state,
            property_country,
            property_seo_title,
            property_seo_slug,
            property_seo_meta_tags,
            property_seo_description,
            property_hostel_type,
            property_hostel_description,
            est_year,
            category,
            status,
            property_courses,
            property_type,
          },
        }
      )
        .then((result) => {
          return res.send({ message: "Property updated." });
        })
        .catch((err) => {
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.status(400).json({ error: "Property not found!" });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteProperty = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const property = await Property.findOne({ _id: objectId });

    if (!property) {
      return res.status(404).send({ error: "Property not found." });
    }

    const uniqueId = property.uniqueId;
    const propertyFolder = path.join(__dirname, `../media/${uniqueId}`);

    await Property.findOneAndDelete({ _id: objectId });
    await Teachers.deleteMany({ property_id: uniqueId });
    await Gallery.deleteMany({ propertyId: uniqueId });
    await Review.deleteMany({ property_id: uniqueId });
    await PropertyCourse.deleteMany({ property_id: uniqueId });
    await Seo.deleteMany({ property_id: uniqueId });
    await Faqs.deleteMany({ property_id: uniqueId });
    await Achievements.deleteMany({ property_id: uniqueId });
    await BusinessHour.deleteMany({ property_id: uniqueId });
    await Enquiry.deleteMany({ property_id: uniqueId });
    await ArchiveEnquiry.deleteMany({ property_id: uniqueId });
    await Amenities.deleteMany({ propertyId: uniqueId });

    try {
      const folderExists = await fs
        .stat(propertyFolder)
        .then(() => true)
        .catch(() => false);

      if (folderExists) {
        await fs.rm(propertyFolder, { recursive: true, force: true });
      } else {
      }
    } catch (err) {
      console.log("Internal Server Error");
    }

    res.send({ message: "Property and associated data deleted successfully." });
  } catch (err) {
    return res.status(500).send({ error: "Internal Server Error." });
  }
};

export const updatePropertyImages = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const { property_name } = req.body;
    const iconFile = req.files["property_logo"];
    const property = await Property.findOne({ _id: objectId });

    const propertyIcon = iconFile
      ? req?.files["property_logo"]?.[0]?.filename
      : property?.property_logo[0];

    const featuredFile = req.files["featured_image"];

    const featuredImage = featuredFile
      ? req?.files["featured_image"][0]?.filename
      : property?.featured_image[0];

    const orignal_property_logo = iconFile
      ? req?.files["property_logo"]?.[0]?.originalFilename
      : property?.property_logo[1];

    const orignal_feature_image = featuredFile
      ? req?.files["featured_image"]?.[0]?.originalFilename
      : property?.featured_image[1];

    if (property) {
      await Property.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            property_logo: [propertyIcon, orignal_property_logo],
            featured_image: [featuredImage, orignal_feature_image],
          },
        }
      )
        .then((result) => {
          return res.send({ message: "Image updated." });
        })
        .catch((err) => {
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Property not found!" });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};
