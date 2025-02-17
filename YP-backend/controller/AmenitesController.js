import Amenities from "../models/Ameniteis.js";

export const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.find();
    return res.json(amenities);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const addAmenities = async (req, res) => {
  try {
    const { propertyId, selectedAmenities } = req.body;
    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    if (!selectedAmenities || Object.keys(selectedAmenities).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one amenity must be selected" });
    }

    const existingAmenities = await Amenities.findOne({ propertyId });
    if (existingAmenities) {
      return res
        .status(400)
        .json({ error: "Amenities already exist for this property" });
    }

    const lastAmenities = await Amenities.findOne().sort({ _id: -1 }).limit(1);
    const x = lastAmenities ? lastAmenities.uniqueId + 1 : 1;

    const amenities = new Amenities({
      uniqueId: x,
      propertyId,
      selectedAmenities,
    });

    await amenities.save();

    res.status(200).json({
      message: "Amenities added successfully",
      data: amenities,
    });
  } catch (error) {
    console.error("Error creating amenities:", error);
    res.status(500).json({
      error: "Failed to create amenities",
      details: error.message,
    });
  }
};

export const updateAmenities = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    if (!uniqueId) {
      return res.status(400).json({ error: "Amenities ID is required!" });
    }

    const amenitiesId = await Amenities.findOne({ uniqueId });
    if (!amenitiesId) {
      return res.status(404).json({ error: "Amenities not found!" });
    }

    const { propertyId, selectedAmenities } = req.body;

    console.log(selectedAmenities, "y");

    const updatedAmenities = await Amenities.findOneAndUpdate(
      { uniqueId },
      {
        $set: {
          propertyId,
          selectedAmenities,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Updated successfully.", updatedAmenities });
  } catch (error) {
    console.error(error);
  }
};
