const multer = require("multer");
const ApiError = require("../utils/ApiError");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {
        return cb(null, true);
    }

    return cb(
        new ApiError(
            400,
            "Only image files are allowed."
        )
    );
};

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2 MB
    },
    fileFilter
});

module.exports = upload;