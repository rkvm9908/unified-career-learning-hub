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

module.exports = {
    getProfile,
    getSafeUserProfile
};