import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  uniqueId: {
    type: Number,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
    unique: true,
  },
  category_icon: {
    type: Array,
    required: true,
  },
  featured_image: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parent_category: {
    type: String,
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

const Category = mongoose.model("Category", CategorySchema);

export default Category;
