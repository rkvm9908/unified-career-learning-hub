const Certification = require("../models/certification.model");

const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Create Certification
 */
const createCertification = async (ownerId, certificationData) => {
    const certification = await Certification.create({
        owner: ownerId,
        ...certificationData
    });

    return certification;
};

/**
 * Get My Certifications
 */
const getMyCertifications = async (ownerId) => {
    return await Certification.find({
        owner: ownerId,
        isActive: true
    })
        .populate("skills", "name category")
        .sort({ createdAt: -1 });
};

/**
 * Get Certification By ID
 */
const getCertificationById = async (
    certificationId,
    ownerId
) => {
    const certification = await Certification.findOne({
        _id: certificationId,
        owner: ownerId,
        isActive: true
    }).populate("skills", "name category");

    if (!certification) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    return certification;
};

/**
 * Update Certification
 */
const updateCertification = async (
    certificationId,
    ownerId,
    updateData
) => {
    const certification = await Certification.findOne({
        _id: certificationId,
        owner: ownerId,
        isActive: true
    });

    if (!certification) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    Object.assign(certification, updateData);

    await certification.save();

    return certification;
};

/**
 * Delete Certification
 */
const deleteCertification = async (
    certificationId,
    ownerId
) => {
    const certification = await Certification.findOne({
        _id: certificationId,
        owner: ownerId,
        isActive: true
    });

    if (!certification) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    certification.isActive = false;

    await certification.save();
};

module.exports = {
    createCertification,
    getMyCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
};