const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload File to Cloudinary
 */
const uploadToCloudinary = async (filePath, folder = "career-learning-hub") => {

    if (!filePath) {
        return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: "auto"
    });

    // Delete local file after upload
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    return result;
};

/**
 * Delete File from Cloudinary
 */
const deleteFromCloudinary = async (publicId) => {

    if (!publicId) {
        return null;
    }

    return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
    cloudinary,
    uploadToCloudinary,
    deleteFromCloudinary
};