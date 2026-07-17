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
// Chat Attachment Upload
const uploadMessageAttachment = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ];
        if (
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("audio/") ||
            allowedTypes.includes(file.mimetype)
        ) {
            return cb(null, true);
        }
        cb(
            new Error(
                "Unsupported attachment type."
            )
        );
    }
});
module.exports = {
    uploadImage,
    uploadResume,
    uploadMessageAttachment
};