import Location from "../models/Location.js";

export const UpdateLocation = async (req, res) => {
  try {
    const { property_id } = req.params;

    if (!property_id) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    const {
      property_address,
      property_pincode,
      property_country,
      property_state,
      property_city,
    } = req.body;

    if (
      !property_address &&
      !property_pincode &&
      !property_country &&
      !property_state &&
      !property_city
    ) {
      return res.status(400).json({ error: "No data provided to update" });
    }

    const updateData = {};
    if (property_address) updateData.property_address = property_address;
    if (property_pincode) updateData.property_pincode = property_pincode;
    if (property_country) updateData.property_country = property_country;
    if (property_state) updateData.property_state = property_state;
    if (property_city) updateData.property_city = property_city;

    const updatedLocation = await Location.findOneAndUpdate(
      { property_id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    return res.status(200).json({
      message: "Location updated successfully",
      data: updatedLocation,
    });
  } catch (error) {
    console.error("UpdateLocation Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLocation = async (req, res) => {
  try {
    const { property_id } = req.params;

    if (!property_id) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    const location = await Location.findOne({ property_id });

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    return res.status(200).json(location);
  } catch (error) {
    console.error("getLocation Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
