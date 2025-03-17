import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  uniqueId: {
    type: Number,
  },
  property_name: {
    type: String,
  },
  property_id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  gender: {
    type: String,
  },
  rating: {
    type: Number,
    required: [true, "Please Provide a rating"],
  },
  review: {
    type: String,
    required: [true, "Please Provide a review"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
