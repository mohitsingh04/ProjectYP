import mongoose from "mongoose";

const PropertyCourseSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  image: {
    type: String,
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
  course_name: {
    type: String,
  },
  price: {
    type: String,
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
    default: "Pending",
  },
  property_id: {
    type: Number,
  },
  property_name: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PropertyCourse = mongoose.model("PropertyCourse", PropertyCourseSchema);

export default PropertyCourse;
