const {
    getProfile,
    updateProfile,
    changePassword,
    updateProfileImage,
    deleteAccount
} = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Get Current User Profile
 */
const getMyProfile = asyncHandler(async (req, res) => {

    const user = await getProfile(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.DATA_FETCHED,
            user
        )
    );
});

/**
 * Update Logged-in User Profile
 */
const updateMyProfile = asyncHandler(async (req, res) => {

    const updatedUser = await updateProfile(
        req.user.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.DATA_UPDATED,
            updatedUser
        )
    );
});

/**
 * Change User Password
 */
const changeMyPassword = asyncHandler(async (req, res) => {

    const {
        currentPassword,
        newPassword
    } = req.body;

    await changePassword(
        req.user.id,
        currentPassword,
        newPassword
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PASSWORD_CHANGED
        )
    );
});

/**
 * Upload Profile Image
 */
const uploadMyProfileImage = asyncHandler(async (req, res) => {

    const user = await updateProfileImage(
        req.user.id,
        req.file
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.DATA_UPDATED,
            user
        )
    );
});

/**
 * Delete My Account
 */
const deleteMyAccount = asyncHandler(async (req, res) => {

    await deleteAccount(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.ACCOUNT_DELETED
        )
    );
});

module.exports = {
    getMyProfile,
    updateMyProfile,
    changeMyPassword,
    uploadMyProfileImage,
    deleteMyAccount
};
