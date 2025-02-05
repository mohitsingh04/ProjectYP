import BusinessHour from "../models/BusinessHour.js";

export const getBusinessHours = async (req, res) => {
  try {
    const businessHours = await BusinessHour.find();
    return res.status(200).json(businessHours);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};

export const addBusinessHours = async (req, res) => {
  try {
    const {
      property_id,
      property_name,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = req.body;

    const isProperty = await BusinessHour.findOne({ property_id: property_id });

    if (isProperty) {
      const updateBussinessHour = await BusinessHour.findOneAndUpdate(
        { property_id: property_id },
        {
          $set: {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Buisness Hours Updated Successfully",
        updateBussinessHour,
      });
    }

    const businessHours = new BusinessHour({
      property_id,
      property_name,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });
    await businessHours.save();
    return res
      .status(201)
      .json({ message: "Buisness Hours Added Successfully" });
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};

export const getBusinessHoursByPropertyId = async (req, res) => {
  try {
    const { property_id } = req.params;
    const businessHours = await BusinessHour.find({ property_id: property_id });
    return res.status(200).json(businessHours);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
