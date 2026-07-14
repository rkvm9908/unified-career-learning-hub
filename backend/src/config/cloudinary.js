const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload Buffer to Cloudinary
 */
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(uploadStream);
    });
};

/**
 * Delete File From Cloudinary
 */
const deleteFromCloudinary = async (publicId) => {

    if (!publicId) {
        return;
    }

    return await cloudinary.uploader.destroy(
        publicId,
        {
            resource_type: "auto"
        }
    );
};

module.exports = {
    cloudinary,
    uploadToCloudinary,
    deleteFromCloudinary
};