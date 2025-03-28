import { GalleryImageMover } from "../helper/FolderCleaners/PropertyImageMover.js";
import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    return res.status(200).json(gallery);
  } catch (err) {
    return res.send({ error: "Internal Server Error!" });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const gallery = await Gallery.findOne({ uniqueId: uniqueId });
    return res.status(200).json(gallery);
  } catch (err) {
    return res.send({ error: "Internal Server Error!" });
  }
};
export const getGalleryByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const gallery = await Gallery.find({ propertyId: propertyId });
    return res.status(200).json(gallery);
  } catch (err) {
    return res.send({ error: "Internal Server Error!" });
  }
};

export const addGallery = async (req, res) => {
  try {
    const { propertyId, title } = req.body;
    const gallery = [];

    if (req?.files?.gallery && req.files.gallery.length > 4) {
      return res
        .status(400)
        .json({ error: "You Cannot Add More than 4 Images at Once." });
    }

    if (req?.files?.gallery && req.files.gallery.length > 0) {
      for (let i = 0; i < req.files.gallery.length; i++) {
        gallery.push(req.files.gallery[i]?.path);
      }
      for (let j = 0; j < req.files.gallery.length; j++) {
        gallery.push(req.files.gallery[j]?.originalPath);
      }
    }

    const existGallery = await Gallery.findOne({ propertyId, title });
    if (existGallery) {
      return res.status(400).json({ error: "Gallery is already exist." });
    }

    const lastGallery = await Gallery.findOne().sort({ _id: -1 }).limit(1);
    const x = lastGallery ? lastGallery.uniqueId + 1 : 1;

    // const user = await User.findOne({ _id: userId }).select("-password");
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // const userUniqueId = user.uniqueId;

    const newGallery = new Gallery({
      uniqueId: x,
      //   userId: userUniqueId,
      propertyId,
      title,
      gallery,
    });

    const savedGallery = await newGallery.save();

    await GalleryImageMover();
    return res.json({ message: "Added Successfully.", savedGallery });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    if (!uniqueId) {
      return res.status(400).json({ error: "Gallery ID is required!" });
    }

    const existGallery = await Gallery.findOne({ uniqueId });
    if (!existGallery) {
      return res.status(404).json({ error: "Gallery not found!" });
    }

    // Parse incoming fields
    let { title, gallery } = req.body;

    gallery = Array.isArray(gallery) ? gallery : [];

    const newGallery = [];

    if (req?.files?.newImages && req?.files?.newImages.length > 4) {
      return res
        .status(400)
        .json({ error: "You Cannot Add More than 4 Images at Once." });
    }

    newGallery.push(gallery);
    if (req?.files?.newImages && req.files.newImages.length > 0) {
      for (let i = 0; i < req.files.newImages.length; i++) {
        gallery.push(req.files.newImages[i]?.path);
      }
      for (let j = 0; j < req.files.newImages.length; j++) {
        gallery.push(req.files.newImages[j]?.originalPath);
      }
    }

    const checkLimit = gallery.filter((item) => item.endsWith(".webp"));

    if (checkLimit.length > 8) {
      return res
        .status(400)
        .json({ error: "You Cannot Add More Than 8 Images in a Gallery" });
    }

    const updateGallery = await Gallery.findOneAndUpdate(
      { uniqueId: uniqueId },
      {
        $set: {
          title: title,
          gallery: gallery,
        },
      },
      { new: true }
    );

    if (updateGallery) {
      await GalleryImageMover();
      return res.status(200).json({
        message: "Gallery updated successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const images = await Gallery.findOne({ uniqueId: uniqueId });
    if (images) {
      await Gallery.findOneAndDelete({ uniqueId: uniqueId })
        .then(async (result) => {
          await GalleryImageMover();
          return res.send({ message: "Gallery Deleted." });
        })
        .catch((err) => {
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Gallery not found!" });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error!" });
  }
};
