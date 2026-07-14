// import 

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    uploadToCloudinary
} = require("../config/cloudinary");

const {
    createJob,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob,
    getAllJobs,
    getFeaturedJobs,
    toggleFeaturedJob,
    uploadCompanyLogo
} = require("../services/job.service");

// ---------------------------------------------------------

/**
 * Create Job
 */
const createJobController =
asyncHandler(async (req, res) => {

    const job =
        await createJob(
            req.user.id,
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.JOB_CREATED,
            job
        )
    );
});

// ---------------------------------------------------

/**
 * Get My Jobs
 */
const getMyJobsController =
asyncHandler(async (req, res) => {

    const jobs =
        await getMyJobs(
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOBS_FETCHED,
            jobs
        )
    );
});

// ------------------------------------------------------------------

/**
 * Get Job By ID
 */
const getJobByIdController =
asyncHandler(async (req, res) => {

    const job =
        await getJobById(
            req.params.id,
            req.user?._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_FETCHED,
            job
        )
    );
});

// ------------------------------------------------------------

/**
 * Update Job
 */
const updateJobController =
asyncHandler(async (req, res) => {

    const job =
        await updateJob(
            req.params.id,
            req.user.id,
            req.body
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_UPDATED,
            job
        )
    );
}); 

// ------------------------------------------------

/**
 * Delete Job
 */
const deleteJobController =
asyncHandler(async (req, res) => {

    await deleteJob(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_DELETED
        )
    );
});

// --------------------------------------

/**
 * Get All Jobs
 */
const getAllJobsController =
asyncHandler(async (req, res) => {

    const result =
        await getAllJobs(
            req.query
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOBS_FETCHED,
            result
        )
    );
});

// ------------------------------------------------

/**
 * Upload Company Logo
 */
const uploadCompanyLogoController =
asyncHandler(async (req, res) => {

    if (!req.file) {

        throw new ApiError(
            400,
            RESPONSE_MESSAGES.IMAGE_REQUIRED
        );

    }

    const uploadedLogo =
                    await uploadToCloudinary(
                        req.file.buffer,
                        "jobs"
                    );

    const job =
        await uploadCompanyLogo(
            req.params.id,
            req.user.id,
            uploadedLogo
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_LOGO_UPDATED,
            job
        )
    );
});

// -----------------------------------------

/**
 * Toggle Featured Job
 */
const toggleFeaturedJobController =
asyncHandler(async (req, res) => {

    const job =
        await toggleFeaturedJob(
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
 * Get Featured Jobs
 */
const getFeaturedJobsController =
asyncHandler(async (req, res) => {

    const jobs =
        await getFeaturedJobs();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.FEATURED_JOBS_FETCHED,
            jobs
        )
    );
});
// ----------------------------------------
// Exports

module.exports = {
    createJobController,
    getMyJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController,
    getAllJobsController,
    getFeaturedJobsController,
    uploadCompanyLogoController,
    toggleFeaturedJobController
};