import Faqs from "../models/Faqs.js";
import Gallery from "../models/Gallery.js";
import Property from "../models/Property.js";
import PropertyCourse from "../models/PropertyCourse.js";
import Review from "../models/Reviews.js";
import Seo from "../models/Seo.js";
import Teachers from "../models/Teachers.js";

export const getProperty = async (req, res) => {
  try {
    const property = await Property.find();
    return res.status(200).json(property);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const property = await Property.findOne({ uniqueId: uniqueId });
    return res.status(200).json(property);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const getPropertyBySlug = async (req, res) => {
  try {
    const property_slug = req.params.property_slug;
    const property = await Property.findOne({ property_slug: property_slug });
    return res.status(200).json(property);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const addProperty = async (req, res) => {
  try {
    const {
      userId,
      property_name,
      property_email,
      property_mobile_no,
      category,
      property_description,
    } = req.body;
    const slug = property_name.replace(/ /g, "-").toLowerCase();
    const property_icon = req?.files["property_icon"]?.[0]?.filename;
    const featured_image = req?.files["featured_image"]?.[0]?.filename;
    const property = await Property.findOne().sort({ _id: -1 }).limit(1);
    const existProperty = await Property.findOne({
      property_name: property_name,
    });
    if (!existProperty) {
      const x = property ? property.uniqueId + 1 : 1;
      const newProperty = new Property({
        uniqueId: x,
        userId,
        property_name,
        property_email,
        property_mobile_no,
        category,
        property_icon,
        featured_image,
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
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const {
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
    } = req.body;
    const businessHours = new Property({
      businessHours: Object.entries(req.body).map(([day, times]) => ({
        day,
        ...times,
      })),
    });
    console.log(businessHours);
    const property = await Property.findOne({ property_name: property_name });
    if (property) {
      await Property.findOneAndUpdate(
        { uniqueId: uniqueId },
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
            businessHours,
          },
        }
      )
        .then((result) => {
          return res.send({ message: "Property updated." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Property not found!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const property = await Property.findOne({ uniqueId: uniqueId });
    if (property) {
      await Property.findOneAndDelete({ uniqueId: uniqueId });
      await Teachers.deleteMany({ property_id: uniqueId });
      await Gallery.deleteMany({ property_id: uniqueId });
      await Review.deleteMany({ property_id: uniqueId });
      await PropertyCourse.deleteMany({ property_id: uniqueId });
      await Seo.deleteMany({ property_id: uniqueId });
      await Faqs.deleteMany({ property_id: uniqueId });
      res.send({ message: "Property Deleted." });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};

export const updatePropertyImages = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const { property_name } = req.body;
    const iconFile = req.files["property_icon"];
    const propertyIcon = iconFile
      ? req?.files["property_icon"][0]?.filename
      : req.body.property_icon;
    const featuredFile = req.files["featured_image"];
    const featuredImage = featuredFile
      ? req?.files["featured_image"][0]?.filename
      : req.body.featured_image;
    const property = await Property.findOne({ property_name: property_name });
    if (property) {
      await Property.findOneAndUpdate(
        { uniqueId: uniqueId },
        {
          $set: {
            property_icon: propertyIcon,
            featured_image: featuredImage,
          },
        }
      )
        .then((result) => {
          return res.send({ message: "Image updated." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Property not found!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error." });
  }
};
