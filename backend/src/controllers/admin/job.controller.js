const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../../constants/responseMessages");

const {
    getAllJobsAdmin,
    getJobByIdAdmin,
    updateJobStatus,
    toggleFeaturedJobAdmin,
    deleteJobAdmin,
    restoreJobAdmin
} = require("../../services/admin/job.service");
/**
 * Get All Jobs
 */
const getAllJobsAdminController = asyncHandler(async (req, res) => {
    const result = await getAllJobsAdmin(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOBS_FETCHED,
            result
        )
    );
});

/**
 * Get Job By Id
 */
const getJobByIdAdminController = asyncHandler(async (req, res) => {
    const job = await getJobByIdAdmin(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_FETCHED,
            job
        )
    );
});

/**
 * Update Job Status
 */
const updateJobStatusController = asyncHandler(async (
    req,
    res
) => {

    const job =
        await updateJobStatus(
            req.params.id,
            req.body.status
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_STATUS_UPDATED,
            job
        )
    );

});

/**
 * Toggle Featured Job
 */
const toggleFeaturedJobAdminController = asyncHandler(async (
    req,
    res
) => {

    const job =
        await toggleFeaturedJobAdmin(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_FEATURE_UPDATED,
            job
        )
    );

});

/**
 * Delete Job
 */
const deleteJobAdminController = asyncHandler(async (
    req,
    res
) => {

    const job = await deleteJobAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_DELETED,
            job
        )
    );

});

/**
 * Restore Job
 */
const restoreJobAdminController = asyncHandler(async (
    req,
    res
) => {

    const job = await restoreJobAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_RESTORED,
            job
        )
    );

});

module.exports = {
    getAllJobsAdminController,
    getJobByIdAdminController,
    updateJobStatusController,
    toggleFeaturedJobAdminController,
    deleteJobAdminController,
    restoreJobAdminController
};