const asyncHandler=require("../../utils/asyncHandler");
const ApiResponse=require("../../utils/ApiResponse");

const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const {
    getAllApplicationsAdmin,
    getApplicationByIdAdmin,
    updateApplicationStatus,
    deleteApplicationAdmin,
    restoreApplicationAdmin
} = require("../../services/admin/application.service");

/**
 * Get All Applications
 */
const getAllApplicationsAdminController=asyncHandler(async(req,res)=>{

    const result=await getAllApplicationsAdmin(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.APPLICATIONS_FETCHED,
            result
        )
    );

});

/**
 * Get Application By Id
 */
const getApplicationByIdAdminController=asyncHandler(async(req,res)=>{

    const application=await getApplicationByIdAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.APPLICATION_FETCHED,
            application
        )
    );

});

/**
 * Update Application Status
 */
const updateApplicationStatusController = asyncHandler(async (
    req,
    res
) => {

    const application =
        await updateApplicationStatus(
            req.params.id,
            req.body.status
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.APPLICATION_STATUS_UPDATED,
            application
        )
    );

});

/**
 * Delete Application
 */
const deleteApplicationAdminController = asyncHandler(async (
    req,
    res
) => {

    const application =
        await deleteApplicationAdmin(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.APPLICATION_DELETED,
            application
        )
    );

});

/**
 * Restore Application
 */
const restoreApplicationAdminController = asyncHandler(async (
    req,
    res
) => {

    const application =
        await restoreApplicationAdmin(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.APPLICATION_RESTORED,
            application
        )
    );

});

module.exports = {
    getAllApplicationsAdminController,
    getApplicationByIdAdminController,
    updateApplicationStatusController,
    deleteApplicationAdminController,
    restoreApplicationAdminController
};