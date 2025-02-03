import multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname + '.webp');
        cb(null, "IMG" + "-" + Date.now() + '-' + file.originalname + "-" + '.webp');
        // cb(null, "IMG" + "-" + Date.now() + ".webp");
    }
});

export const upload = multer({ storage: storage });