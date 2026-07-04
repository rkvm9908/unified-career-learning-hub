const ApiError = require("../utils/ApiError");
const HTTP_STATUS = require("../constants/httpStatus");
const RESPONSE_MESSAGES = require("../constants/responseMessages"); 
const notFound = (req, res, next) => {

    next(
        new ApiError(
            HTTP_STATUS.NOT_FOUND,
            `${RESPONSE_MESSAGES.ROUTE_NOT_FOUND} - ${req.originalUrl}`
        )
    );

};

module.exports = notFound;