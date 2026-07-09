const cloudinary = require("../config/cloudinary");

const uploadImage = async (fileBuffer) => {

    return new Promise((resolve, reject) => {

        cloudinary.uploader
            .upload_stream(
                {
                    folder: "career-hub/profile-images"
                },
                (error, result) => {

                    if (error) {
                        return reject(error);
                    }

                    resolve(result);
                }
            )
            .end(fileBuffer);
    });

};

module.exports = {
    uploadImage
};