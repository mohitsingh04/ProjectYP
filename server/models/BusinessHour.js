import mongoose from "mongoose";

const BusinessHourSchema = new mongoose.Schema(
  {
    property_id: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
    },
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  { timestamps: true }
);

const BusinessHour = mongoose.model("BusinessHour", BusinessHourSchema);

export default BusinessHour;
