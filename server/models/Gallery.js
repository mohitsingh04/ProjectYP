import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  uniqueId: {
    type: Number,
  },
  userId: {
    type: Number,
  },
  propertyId: {
    type: Number,
  },
  title: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", GallerySchema);

export default Gallery;
