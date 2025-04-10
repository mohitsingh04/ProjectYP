import mongoose from "mongoose";

const PropertyCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    image: {
      type: Array,
    },
    uniqueId: {
      type: Number,
    },
    course_type: {
      type: String,
    },
    course_short_name: {
      type: String,
    },
    certification_type: {
      type: String,
    },
    course_name: {
      type: String,
    },
    prices: {
      type: Array,
    },
    course_level: {
      type: String,
    },
    duration: {
      type: String,
    },
    course_id: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
    property_id: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const PropertyCourse = mongoose.model("PropertyCourse", PropertyCourseSchema);

export default PropertyCourse;
