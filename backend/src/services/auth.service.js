const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { verifyRefreshToken } = require("../utils/jwt");

/**
 * Register New User
 */
const registerUser = async (userData) => {
    // Normalize input
    const email = userData.email.trim().toLowerCase();
    const username = userData.username.trim().toLowerCase();

    userData.email = email;
    userData.username = username;

    // Check if email or username already exists
    const existingUser = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    }).lean();

    if (existingUser) {
        if (existingUser.email === email) {
            throw new ApiError(
                409,
                RESPONSE_MESSAGES.EMAIL_ALREADY_EXISTS
            );
        }

        if (existingUser.username === username) {
            throw new ApiError(
                409,
                RESPONSE_MESSAGES.USERNAME_ALREADY_EXISTS
            );
        }
    }

    // Create new user
    const createdUser = await User.create(userData);

    // Return only safe fields
    return {
        id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        username: createdUser.username,
        email: createdUser.email
    };
};

/**
 * Generate Access & Refresh Tokens
 */
const generateTokens = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false
    });

    return {
        accessToken,
        refreshToken
    };
};

/**
 * Get Safe User Data
 */
const getSafeUser = (user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role
});

/**
 * Login User
 */
const loginUser = async ({ email, password }) => {
    // Normalize email
    email = email.trim().toLowerCase();

    // Find user with password & refresh token
    const user = await User.findOne({ email })
        .select("+password +refreshToken");

    // User not found
    if (!user) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.INVALID_CREDENTIALS
        );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.INVALID_CREDENTIALS
        );
    }

    // Generate tokens
    const {
        accessToken,
        refreshToken
    } = await generateTokens(user);

    return {
        user: getSafeUser(user),
        accessToken,
        refreshToken
    };
};

/**
 * Refresh Access Token
 */
const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }

    // Verify Refresh Token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    const user = await User.findById(decoded.id)
        .select("+refreshToken");

    if (!user) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }

    // Compare stored refresh token
    if (!user.refreshToken || user.refreshToken !== refreshToken) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }
    // Generate new tokens (Rotation)
    const {
        accessToken,
        refreshToken: newRefreshToken
    } = await generateTokens(user);

    return {
        user: getSafeUser(user),
        accessToken,
        refreshToken: newRefreshToken
    };
};

/**
 * Logout User
 */
const logoutUser = async (refreshToken) => {

    if (!refreshToken) {
        return;
    }

    // Verify refresh token
    try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id)
        .select("+refreshToken");

    if (user) {
        user.refreshToken = "";

        await user.save({
            validateBeforeSave: false
        });
    }
    } catch {
        // Ignore invalid/expired token
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    generateTokens,
    getSafeUser
};