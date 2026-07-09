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
const upload = require("../middleware/upload.middleware");
const router = express.Router();
const {
    updateProfileSchema,
    changePasswordSchema
} = require("../validators/user.validator");

router.route("/me")
    .get(
        protect,
        getMyProfile
    )
    .delete(
        protect,
        deleteMyAccount
    )
    .patch(
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
    upload.single("profileImage"),
    uploadMyProfileImage
);


module.exports = router;