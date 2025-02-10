import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    return res.status(200).json(gallery);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const gallery = await Gallery.findOne({ uniqueId: uniqueId });
    return res.status(200).json(gallery);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const addGallery = async (req, res) => {
  try {
    const { propertyId, title } = req.body;
    const gallery = [];

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

    console.log(req.body);
    const newGallery = [];

    newGallery.push(gallery);
    if (req?.files?.newImages && req.files.newImages.length > 0) {
      for (let i = 0; i < req.files.newImages.length; i++) {
        gallery.push(req.files.newImages[i]?.path);
      }
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
      return res.status(200).json({
        message: "Gallery updated successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const images = await Gallery.findOne({ uniqueId: uniqueId });
    if (images) {
      await Gallery.findOneAndDelete({ uniqueId: uniqueId })
        .then((result) => {
          return res.send({ message: "Gallery Deleted." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Gallery not found!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};
