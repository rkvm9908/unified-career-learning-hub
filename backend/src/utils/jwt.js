const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Generate Access Token
 */
const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
        }
    );
};

/**
 * Generate Refresh Token
 */
const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        }
    );
};

/**
 * Verify Access Token
 */
const verifyAccessToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }
};

/**
 * Verify Refresh Token
 */
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};