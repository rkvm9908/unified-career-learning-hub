const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Get Safe User Profile
 */
const getSafeUserProfile = (user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImage: user.profileImage,
    bio: user.bio,
    role: user.role,
    skills: user.skills,
    education: user.education,
    socialLinks: user.socialLinks,
    isEmailVerified: user.isEmailVerified,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

const { uploadImage } = require("./upload.service");

/**
 * Get Logged-in User Profile
 */
const getProfile = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    return getSafeUserProfile(user);
};

/**
 * Update User Profile
 */
const updateProfile = async (userId, updateData) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    // Update only allowed fields
    const allowedFields = [
        "firstName",
        "lastName",
        "phoneNumber",
        "bio",
        "skills",
        "education",
        "socialLinks"
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            user[field] = updateData[field];
        }
    });

    await user.save();

    return getSafeUserProfile(user);
};

/**
 * Change User Password
 */
const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {

    // Get user with password
    const user = await User.findById(userId)
        .select("+password");

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    // Verify current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.INVALID_CREDENTIALS
        );
    }

    // Prevent same password
    if (currentPassword === newPassword) {
        throw new ApiError(
            400,
            "New password cannot be the same as the current password."
        );
    }

    // Update password
    user.password = newPassword;

    // Password hashing happens automatically
    // in the pre("save") hook
    await user.save();

    return;
};

/**
 * Update Profile Image
 */
const updateProfileImage = async (userId, file) => {

    if (!file) {
        throw new ApiError(
            400,
            "Profile image is required."
        );
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImage(file.buffer);

    // Save image URL
    user.profileImage = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
    };
    await user.save();

    return getSafeUserProfile(user);
};

/**
 * Delete User Account (Soft Delete)
 */
const deleteAccount = async (userId) => {

    const user = await User.findById(userId)
        .select("+refreshToken");

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    // Soft delete
    user.isActive = false;
    user.refreshToken = "";

    await user.save({
        validateBeforeSave: false
    });

    return;
};

module.exports = {
    getProfile,
    getSafeUserProfile,
    updateProfile,
    changePassword,
    updateProfileImage,
    deleteAccount
};
