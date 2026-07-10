const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    RESPONSE_MESSAGES.FORBIDDEN
                )
            );
        }

        next();
    };
};

module.exports = {
    authorize
};