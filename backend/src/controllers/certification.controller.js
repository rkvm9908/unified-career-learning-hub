const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    createCertification,
    getMyCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
} = require("../services/certification.service");

/**
 * Create Certification
 */
const createCertificationController = asyncHandler(async (req, res) => {
    const certification = await createCertification(
        req.user.id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.CERTIFICATION_CREATED,
            certification
        )
    );
});

/**
 * Get My Certifications
 */
const getMyCertificationsController = asyncHandler(async (req, res) => {
    const certifications = await getMyCertifications(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATIONS_FETCHED,
            certifications
        )
    );
});

/**
 * Get Certification By ID
 */
const getCertificationByIdController = asyncHandler(async (req, res) => {
    const certification = await getCertificationById(
        req.params.id,
        req.user.id
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
 * Update Certification
 */
const updateCertificationController = asyncHandler(async (req, res) => {
    const certification = await updateCertification(
        req.params.id,
        req.user.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATION_UPDATED,
            certification
        )
    );
});

/**
 * Delete Certification
 */
const deleteCertificationController = asyncHandler(async (req, res) => {
    await deleteCertification(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CERTIFICATION_DELETED
        )
    );
});

module.exports = {
    createCertificationController,
    getMyCertificationsController,
    getCertificationByIdController,
    updateCertificationController,
    deleteCertificationController
};