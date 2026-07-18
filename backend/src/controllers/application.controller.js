const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {

    applyJob,

    getMyApplications,

    getApplicationById,

    getApplicationsByJob,

    updateApplicationStatus,

    updateApplication,

    withdrawApplication,

    deleteApplication

} = require("../services/application.service");

// ----------------------------------------------------

/**
 * Apply Job
 */
const applyJobController =
asyncHandler(async (req, res) => {

    const application =
        await applyJob(

            req.user.id,

            req.body

        );

    return res.status(201).json(

        new ApiResponse(

            201,

            RESPONSE_MESSAGES.APPLICATION_CREATED,

            application

        )

    );

});

// ----------------------------------------------------

/**
 * Get My Applications
 */
const getMyApplicationsController =
asyncHandler(async (req, res) => {

    const applications =
        await getMyApplications(
            req.user.id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATIONS_FETCHED,

            applications

        )

    );

});

// ----------------------------------------------------

/**
 * Get Application By ID
 */
const getApplicationByIdController =
asyncHandler(async (req, res) => {

    const application =
        await getApplicationById(

            req.params.id,

            req.user.id

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATION_FETCHED,

            application

        )

    );

});

// ----------------------------------------------------

/**
 * Get Applications By Job
 */
const getApplicationsByJobController =
asyncHandler(async (req, res) => {

    const applications =
        await getApplicationsByJob(

            req.params.jobId,

            req.user.id

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATIONS_FETCHED,

            applications

        )

    );

});

// ----------------------------------------------------

/**
 * Update Application Status
 */
const updateApplicationStatusController =
asyncHandler(async (req, res) => {

    const application =
        await updateApplicationStatus(

            req.params.id,

            req.user.id,

            req.body

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATION_UPDATED,

            application

        )

    );

});

// ----------------------------------------------------

/**
 * Update Application
 */
const updateApplicationController =
asyncHandler(async (req, res) => {

    const application =
        await updateApplication(

            req.params.id,

            req.user.id,

            req.body

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATION_UPDATED,

            application

        )

    );

});

// ----------------------------------------------------

/**
 * Withdraw Application
 */
const withdrawApplicationController =
asyncHandler(async (req, res) => {

    const application =
        await withdrawApplication(

            req.params.id,

            req.user.id

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATION_UPDATED,

            application

        )

    );

});

// ----------------------------------------------------

/**
 * Delete Application
 */
const deleteApplicationController =
asyncHandler(async (req, res) => {

    await deleteApplication(

        req.params.id,

        req.user.id

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            RESPONSE_MESSAGES.APPLICATION_DELETED

        )

    );

});

// ----------------------------------------------------

module.exports = {

    applyJobController,
    getMyApplicationsController,
    getApplicationByIdController,
    getApplicationsByJobController,
    updateApplicationStatusController,
    updateApplicationController,
    withdrawApplicationController,
    deleteApplicationController
};