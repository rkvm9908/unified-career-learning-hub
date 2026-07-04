const HTTP_STATUS = require("../constants/httpStatus");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

const errorHandler = (err, req, res, _next) => {

    const statusCode =
        err.statusCode ||
        HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({

        success: false,

        statusCode,

        message:
            err.message ||
            RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        errors:
            err.errors || [],
        stack:
            process.env.NODE_ENV === "production"
                ? null
                : err.stack
    });

};

module.exports = errorHandler;