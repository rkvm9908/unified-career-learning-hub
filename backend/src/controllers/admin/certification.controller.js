const asyncHandler=require("../../utils/asyncHandler");
const ApiResponse=require("../../utils/ApiResponse");
const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    getAllCertificationsAdmin,
    getCertificationByIdAdmin,
    verifyCertificationAdmin,
    deleteCertificationAdmin,
    restoreCertificationAdmin
}=require("../../services/admin/certification.service");

/**
 * Get All Certifications
 */
const getAllCertificationsAdminController=asyncHandler(async(req,res)=>{

    const result=await getAllCertificationsAdmin(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATIONS_FETCHED,
            result
        )
    );

});

/**
 * Get Certification By Id
 */
const getCertificationByIdAdminController=asyncHandler(async(req,res)=>{

    const certification=await getCertificationByIdAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATION_FETCHED,
            certification
        )
    );

});

/**
 * Verify Certification
 */
const verifyCertificationAdminController=asyncHandler(async(req,res)=>{

    const certification=await verifyCertificationAdmin(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATION_VERIFIED,
            certification
        )
    );

});

/**
 * Delete Certification
 */
const deleteCertificationAdminController=asyncHandler(async(req,res)=>{

    const certification=await deleteCertificationAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATION_DELETED,
            certification
        )
    );

});

/**
 * Restore Certification
 */
const restoreCertificationAdminController=asyncHandler(async(req,res)=>{

    const certification=await restoreCertificationAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATION_RESTORED,
            certification
        )
    );

});

module.exports={
    getAllCertificationsAdminController,
    getCertificationByIdAdminController,
    verifyCertificationAdminController,
    deleteCertificationAdminController,
    restoreCertificationAdminController
};