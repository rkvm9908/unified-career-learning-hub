const ApiResponse = require("../utils/ApiResponse");
const HTTP_STATUS = require("../constants/httpStatus");

const healthCheck = (req, res) => {
const RESPONSE_MESSAGES = require("../constants/responseMessages");
    const healthData = {
        serverTime: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    };

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            RESPONSE_MESSAGES.SERVER_RUNNING,
            healthData
        )
    );

}; 

module.exports = {
    healthCheck
};