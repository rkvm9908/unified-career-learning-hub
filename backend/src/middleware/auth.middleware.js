const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { verifyAccessToken } = require("../utils/jwt");

/**
 * Protect Routes
 */
const protect = asyncHandler(async (req, res, next) => {

    // Get Access Token
    const accessToken =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.UNAUTHORIZED
        );
    }

    // Verify JWT
    const decoded = verifyAccessToken(accessToken);

    // Find User
    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(
            401,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    // Check if account is active
    if (!user.isActive) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.ACCOUNT_DEACTIVATED
        );
    }

    // Attach user to request
    req.user = user;

    next();
});

/**
 * Optional Authentication
 */
const optionalAuth = asyncHandler(async (req, res, next) => {

    const accessToken =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
        return next();
    }

    try {

        const decoded =
            verifyAccessToken(accessToken);

        const user =
            await User.findById(decoded.id);

        if (user && user.isActive) {
            req.user = user;
        }

    } catch {
        // Ignore invalid or expired token
    }

    next();
});

const recruiterApproved = (
    req,
    res,
    next
) => {

    if (
        req.user.role === "Recruiter" &&
        !req.user.isApproved
    ) {

        throw new ApiError(
            403,
            RESPONSE_MESSAGES.RECRUITER_NOT_APPROVED
        );

    }

    next();

};
const authorize=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ApiError(403,"Forbidden"));
        }

        next();
    };
};

module.exports = {
    protect,
    optionalAuth,
    authorize,
    recruiterApproved
};