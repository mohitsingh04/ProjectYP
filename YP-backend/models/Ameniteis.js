import mongoose from "mongoose";

const AmenitiesSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: Number,
    },
    propertyId: {
      type: Number,
      required: [true, "Property ID is required"],
    },
    selectedAmenities: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Amenities selection is required"],
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Amenities = mongoose.model("Amenities", AmenitiesSchema);

export default Amenities;
