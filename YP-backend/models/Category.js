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
  },
  featured_image: {
    type: Array,
  },
  description: {
    type: String,
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
