import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  uniqueId: {
    type: Number,
    required: true,
  },
  property_name: {
    type: String,
    required: true,
  },
  property_email: {
    type: String,
    required: true,
  },
  property_mobile_no: {
    type: String,
    required: true,
  },
  property_alt_mobile_no: {
    type: String,
  },
  property_logo: {
    type: Array,
  },
  featured_image: {
    type: Array,
  },
  property_address: {
    type: String,
  },
  property_pincode: {
    type: String,
  },
  property_city: {
    type: String,
  },
  property_state: {
    type: String,
  },
  property_country: {
    type: String,
    default: "India",
  },
  property_seo_title: {
    type: String,
  },
  property_seo_slug: {
    type: String,
  },
  property_seo_meta_tags: {
    type: String,
  },
  property_seo_description: {
    type: String,
  },
  property_description: {
    type: String,
    // required: true,
  },
  property_hostel_type: {
    type: Array,
  },
  property_hostel_description: {
    type: String,
  },
  property_courses: {
    type: Array,
  },
  est_year: {
    type: Number,
  },
  category: {
    type: String,
    default: "Uncategorized",
  },
  property_slug: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Property", PropertySchema);

export default Property;
