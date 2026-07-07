const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Role Based Authorization Middleware
 */
const authorize = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            throw new ApiError(
                401,
                RESPONSE_MESSAGES.UNAUTHORIZED
            );
        }

        if (!roles.includes(req.user.role)) {
            throw new ApiError(
                403,
                RESPONSE_MESSAGES.FORBIDDEN
            );
        }

        next();
    };

};

module.exports = {
    authorize
};