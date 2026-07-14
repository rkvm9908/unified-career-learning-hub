const multer = require("multer");

const storage = multer.memoryStorage();

// Image Upload
const uploadImage = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            return cb(null, true);
        }

        cb(new Error("Only image files are allowed."));
    }
});

// Resume PDF Upload
const uploadResume = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        if (file.mimetype === "application/pdf") {
            return cb(null, true);
        }

        cb(new Error("Only PDF files are allowed."));
    }
});

module.exports = {
    uploadImage,
    uploadResume
};