const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../../constants/responseMessages");

const {
    getAllRecruiters,
    approveRecruiter,
    rejectRecruiter
} = require("../../services/admin/recruiter.service");

/**
 * Get All Recruiters
 */
const getAllRecruitersController = asyncHandler(async (req, res) => {
    const result = await getAllRecruiters(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RECRUITERS_FETCHED,
            result
        )
    );
});

/**
 * Approve Recruiter
 */
const approveRecruiterController = asyncHandler(async (req, res) => {
    const recruiter = await approveRecruiter(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RECRUITER_APPROVED,
            recruiter
        )
    );
});

/**
 * Reject Recruiter
 */
const rejectRecruiterController = asyncHandler(async (req, res) => {
    const recruiter = await rejectRecruiter(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RECRUITER_REJECTED,
            recruiter
        )
    );
});

module.exports = {
    getAllRecruitersController,
    approveRecruiterController,
    rejectRecruiterController
};