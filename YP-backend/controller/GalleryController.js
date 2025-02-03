import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        return res.status(200).json(gallery);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" });
    }
};

export const getGalleryById = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const gallery = await Gallery.findOne({ uniqueId: uniqueId });
        return res.status(200).json(gallery);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" });
    }
};

export const addGallery = async (req, res) => {
    let request = req.body, images = [];
    const gallery = await Gallery.findOne().sort({ _id: -1 }).limit(1);
    if (req?.files != undefined && req?.files?.images?.length > 0) {
        for (let i = 0; i < req?.files?.images?.length; i++) {
            images?.push(req?.files?.images[i]?.filename)
        }
        request.images = images;
    }
    try {
        let exist = await Gallery.findOne({ "title": request.title, "property_id": request.property_id });
        if (exist) {
            return res.status(200).send({ message: 'This title is already exists!' });
        }
        const slug = request.title.replace(/ /g, "-").toLowerCase();
        const kebabCase = request.property_name.replace(/ /g, "-").toLowerCase();
        const x = gallery ? gallery.uniqueId + 1 : 1;
        const newGallery = new Gallery({
            uniqueId: x,
            title: request.title,
            images: request.images,
            property_name: kebabCase,
            gallerySlug: slug,
            property_id: request.property_id
        });
        if (await newGallery.save()) {
            return res.send({ message: "Gallery added." });
        }
    } catch (err) {
        return res.send({ error: "Internal server error!" })
    }
};

export const updateGallery = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const { title } = req.body;
        const gallery = await Gallery.findOne({ uniqueId: uniqueId });
        if (!gallery) {
            return res.send({ error: "Gallery not found!" });
        }
        console.log(title)

        let images = [];
        let exist_gallery_img;
        if (req?.files != undefined && req?.files?.images?.length > 0) {
            for (let i = 0; i < req?.files?.images?.length; i++) {
                images?.push(req?.files?.images[i]?.filename)
            }
        }
        const exist = await Gallery.findOne({ uniqueId: uniqueId })
        if (exist) {
            exist_gallery_img = exist.images
            if (images.length > 0) {
                exist_gallery_img = exist_gallery_img.concat(images)
            }
            const updatedGallery = await Gallery.findOneAndUpdate({ uniqueId: uniqueId }, {
                "$set": {
                    "title": title,
                    "images": exist_gallery_img
                },
            },
                { new: true }
            )
            return res.status(200).send({ status_code: 200, "gallery": updatedGallery, message: "Gallery updated successfully." });
        }
    } catch (error) {
        return res.send({ error: error.message })
    }
};

export const deleteGallery = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const images = await Gallery.findOne({ uniqueId: uniqueId });
        if (images) {
            await Gallery.findOneAndDelete({ uniqueId: uniqueId })
                .then(result => {
                    return res.send({ message: "Gallery Deleted." });
                })
                .catch(err => {
                    console.log(err.message)
                    return res.send({ error: "Internal Server Error." });
                });
        } else {
            return res.send({ error: "Gallery not found!" })
        }
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" });
    }
};