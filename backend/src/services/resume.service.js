const Resume = require("../models/Resume.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Safe Resume Response
 */
const getSafeResume = (resume) => ({
    id: resume._id,
    owner: resume.owner,
    title: resume.title,
    professionalSummary: resume.professionalSummary,
    resumeFile: resume.resumeFile,
    visibility: resume.visibility,
    isActive: resume.isActive,
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt
});

/**
 * Create Resume
 */
const createResume = async (userId, resumeData) => {

    // One Resume Per User
    const existingResume = await Resume.findOne({
        owner: userId,
        isActive: true
    });

    if (existingResume) {
        throw new ApiError(
            409,
            RESPONSE_MESSAGES.RESUME_ALREADY_EXISTS
        );
    }

    const resume = await Resume.create({
        owner: userId,
        ...resumeData
    });

    return getSafeResume(resume);
};

/**
 * Get My Resume
 */
const getMyResume = async (userId) => {

    const resume = await Resume.findOne({
        owner: userId,
        isActive: true
    });

    if (!resume) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RESUME_NOT_FOUND
        );
    }

    return getSafeResume(resume);
};

/**
 * Update Resume
 */
const updateResume = async (
    resumeId,
    userId,
    updateData
) => {

    const resume = await Resume.findById(resumeId);

    if (!resume || !resume.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RESUME_NOT_FOUND
        );
    }

    if (resume.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    Object.assign(resume, updateData);

    await resume.save();

    return getSafeResume(resume);
};

/**
 * Upload Resume PDF
 */
const uploadResume = async (
    resumeId,
    userId,
    uploadedFile,
    originalName
) => {

    const resume = await Resume.findById(resumeId);

    if (!resume || !resume.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RESUME_NOT_FOUND
        );
    }

    // Check Ownership
    if (resume.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    resume.resumeFile = {
        url: uploadedFile.secure_url,
        publicId: uploadedFile.public_id,
        originalName
    };

    await resume.save();

    return getSafeResume(resume);
};

/**
 * Delete Resume (Soft Delete)
 */
const deleteResume = async (
    resumeId,
    userId
) => {

    const resume = await Resume.findById(resumeId);

    if (!resume || !resume.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RESUME_NOT_FOUND
        );
    }

    if (resume.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    resume.isActive = false;

    await resume.save();
};

/**
 * Get Resume Download URL
 */
const downloadResume = async (
    resumeId,
    userId
) => {

    const resume = await Resume.findById(resumeId);

    if (!resume || !resume.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RESUME_NOT_FOUND
        );
    }

    if (resume.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    if (!resume.resumeFile.url) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RESUME_FILE_NOT_FOUND
        );
    }

    return {
        downloadUrl: resume.resumeFile.url,
        fileName: resume.resumeFile.originalName
    };
};

module.exports = {
    createResume,
    getMyResume,
    updateResume,
    deleteResume,
    uploadResume,
    getSafeResume,
    downloadResume
};