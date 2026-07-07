const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { verifyAccessToken } = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {

    // Get Access Token from Cookie
    const accessToken =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }

    // Verify Access Token
    const decoded = verifyAccessToken(accessToken);

    // Find User
    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    // Check User Status
    if (!user.isActive) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    // Attach User to Request
    req.user = user;

    next();
});

module.exports = {
    protect
};