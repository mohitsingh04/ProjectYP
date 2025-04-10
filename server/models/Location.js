import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    property_id: {
      type: String,
      required: true,
    },
    property_address: {
      type: String,
    },
    property_pincode: {
      type: Number,
    },
    property_country: {
      type: String,
    },
    property_state: {
      type: String,
    },
    property_city: {
      type: String,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("location", locationSchema);

export default Location;
