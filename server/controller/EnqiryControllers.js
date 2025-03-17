import ArchiveEnquiry from "../models/ArchiveEnquiry.js";
import Enquiry from "../models/Enquiry.js";

export const addEnquiry = async (req, res) => {
  try {
    const {
      property_id,
      name,
      email,
      contact,
      people,
      date,
      city,
      property_name,
    } = req.body;

    const newEnquiry = Enquiry({
      property_id,
      name,
      email,
      contact,
      people,
      date,
      city,
      property_name,
    });

    const savedEnquiry = await newEnquiry.save();

    if (savedEnquiry) {
      return res.status(200).json({ message: "You are Enrolled." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEnquiryByPropertyId = async (req, res) => {
  try {
    const { property_id } = req.params;
    const enquiry = await Enquiry.find({ property_id: property_id });

    return res.status(200).json(enquiry);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
export const getArchiveEnquiryByPropertyId = async (req, res) => {
  try {
    const { property_id } = req.params;
    const enquiry = await ArchiveEnquiry.find({ property_id: property_id });

    return res.status(200).json(enquiry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.find();

    return res.status(200).json(enquiry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllArchiveEnquiry = async (req, res) => {
  try {
    const enquiry = await ArchiveEnquiry.find();

    return res.status(200).json(enquiry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getEnquiryByObjectId = async (req, res) => {
  try {
    const { objectId } = req.params;
    const enquiry = await Enquiry.findOne({ _id: objectId });

    return res.status(200).json(enquiry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getArchiveEnquiryByObjectId = async (req, res) => {
  try {
    const { objectId } = req.params;
    const enquiry = await ArchiveEnquiry.findOne({ _id: objectId });

    return res.status(200).json(enquiry);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const softDeleteEnquiry = async (req, res) => {
  try {
    const { objectId } = req.params;
    const enquiry = await Enquiry.findById(objectId);

    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry Not Found" });
    }

    const newArchive = new ArchiveEnquiry(enquiry.toObject());
    await newArchive.save();

    const deletedEnquiry = await Enquiry.findByIdAndDelete(objectId);

    if (deletedEnquiry) {
      return res.status(200).json({ message: "Enquiry Moved To Archive" });
    } else {
      return res.status(500).json({ error: "Failed to delete enquiry" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const deleteArchiveEnquiry = async (req, res) => {
  try {
    const { objectId } = req.params;
    const deleteEnquiry = await ArchiveEnquiry.findOneAndDelete({
      _id: objectId,
    });

    if (deleteEnquiry) {
      return res.status(200).json({ message: "Enquiry Deleted Permanently" });
    }
    if (!deleteEnquiry) {
      return res.status(400).json({ error: "Enquiry Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
