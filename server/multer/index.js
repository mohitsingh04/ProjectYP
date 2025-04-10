import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// 1. Generic storage (images folder)
export const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./images"),
  filename: (req, file, cb) => {
    cb(null, `img-${Date.now()}-${file.originalname.toLowerCase()}`);
  },
});
export const upload = multer({ storage });

// 2. User images
export const userStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../media/user"),
  filename: (req, file, cb) => {
    cb(null, `img-${Date.now()}-${file.originalname.toLowerCase()}`);
  },
});
export const userUpload = multer({ storage: userStorage });

// 3. Course images
export const courseStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../media/course"),
  filename: (req, file, cb) => {
    cb(null, `img-${Date.now()}-${file.originalname.toLowerCase()}`);
  },
});
export const courseUploadMulter = multer({ storage: courseStorage });

// 4. Category images
export const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../media/category"),
  filename: (req, file, cb) => {
    cb(null, `img-${Date.now()}-${file.originalname.toLowerCase()}`);
  },
});
export const categoryUploadMulter = multer({ storage: categoryStorage });
export const processImage = async (req, res, next) => {
  const files = req.files;

  if (!files) return next();

  try {
    for (const field in files) {
      for (const file of files[field]) {
        const inputPath = file.path;
        const destinationFolder = path.dirname(inputPath);

        const originalNameParts = file.originalname.toLowerCase().split(".");
        const filenameBase = originalNameParts.slice(0, -1).join(".");
        const outputFilename = `img-${Date.now()}-${filenameBase}-compressed.webp`;
        const outputPath = path.join(destinationFolder, outputFilename);

        // Convert to WebP
        await sharp(inputPath)
          .toFormat("webp")
          .webp({ quality: 40 })
          .toFile(outputPath);

        // Attach to file
        file.originalFilename = file.filename.toLowerCase();
        file.originalPath = inputPath;
        file.webpFilename = outputFilename;
        file.webpPath = outputPath;
      }
    }

    next();
  } catch (error) {
    console.error("Image processing error:", error);
    return res.status(500).json({ error: "Image processing failed" });
  }
};
