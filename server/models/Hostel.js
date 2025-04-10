import mongoose from "mongoose";

const hostelSchema = mongoose.Schema(
  {
    userId: { type: String },
    property_id: { type: String },
    uniqueId: {
      type: String,
      required: true,
    },
    hostel_name: { type: String },
    hostel_price: { type: Array },
    hostel_description: { type: String },
    hostel_images: {
      type: Array,
      default: "[]",
    },
  },
  { timestamps: true }
);

const Hostel = mongoose.model("hostel", hostelSchema);

export default Hostel;
