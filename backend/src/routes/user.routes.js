const express = require("express");

const {
    getMyProfile,
    updateMyProfile,
    changeMyPassword,
    uploadMyProfileImage,
    deleteMyAccount
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");
const { uploadImage } = require("../middleware/upload.middleware");
const router = express.Router();
const {
    updateProfileSchema,
    changePasswordSchema
} = require("../validators/user.validator");

/**
 *  Profile
 */
router.get(
        "/me",
        protect,
        getMyProfile
    )

/**
 * Deactivate
 */
router.delete(
        "/deactivate",
        protect,
        deleteMyAccount
    )

/**
 * Update Profile
 */

router.patch(
        "update-profile",
        protect,
        validate(updateProfileSchema),
        updateMyProfile
    );

/**
 * Change Password
 */
router.patch(
    "/change-password",
    protect,
    validate(changePasswordSchema),
    changeMyPassword
);

/**
 * Upload Profile Image
 */
router.patch(
    "/profile-image",
    protect,
    uploadImage.single("profileImage"),
    uploadMyProfileImage
);


module.exports = router;