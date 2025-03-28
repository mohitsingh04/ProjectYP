import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, "img" + "-" + Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const processImage = async (req, res, next) => {
  const files = req.files;

  if (!files) {
    return next();
  }

  try {
    for (const field in files) {
      for (const file of files[field]) {
        const inputPath = file.path;

        const originalNameParts = file.originalname.toLowerCase().split(".");
        const originalFilename = file.filename.toLowerCase();
        const originalPath = path.join("./images", originalFilename);

        const outputFilename = `img-${Date.now()}-${
          originalNameParts[0]
        }-compressed.webp`;
        const outputPath = path.join("./images", outputFilename);

        await sharp(inputPath)
          .toFormat("webp")
          .webp({ quality: 40 })
          .toFile(outputPath);

        file.originalFilename = originalFilename;
        file.originalPath = originalPath;
        file.filename = outputFilename;
        file.path = outputPath;
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Image processing failed" });
  }
};
