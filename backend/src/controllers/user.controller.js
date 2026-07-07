const { getProfile } = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Get Current User Profile
 */
const getMyProfile = asyncHandler(async (req, res) => {

    const user = await getProfile(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.DATA_FETCHED,
            user
        )
    );
});

module.exports = {
    getMyProfile
};