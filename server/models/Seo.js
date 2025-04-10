import mongoose from "mongoose";

const SeoSchema = new mongoose.Schema({
  uniqueId: {
    type: Number,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  primary_focus_keyword: {
    type: Array,
  },
  json_schema: {
    type: String,
  },
  meta_description: {
    type: String,
  },
  property_id: {
    type: String,
    required: true,
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

const Seo = mongoose.model("Seo", SeoSchema);

export default Seo;
