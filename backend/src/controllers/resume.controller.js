const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const {
    createResume,
    getMyResume,
    updateResume,
    deleteResume,
    uploadResume,
    downloadResume
} = require("../services/resume.service");

const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { uploadToCloudinary } = require("../config/cloudinary");
/**
 * Create Resume
 */
const createResumeController = asyncHandler(async (req, res) => {

    const resume = await createResume(
        req.user.id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.RESUME_CREATED,
            resume
        )
    );
});

/**
 * Get My Resume
 */
const getMyResumeController = asyncHandler(async (req, res) => {

    const resume = await getMyResume(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RESUME_FETCHED,
            resume
        )
    );
});

/**
 * Update Resume
 */
const updateResumeController = asyncHandler(async (req, res) => {

    const resume = await updateResume(
        req.params.id,
        req.user.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RESUME_UPDATED,
            resume
        )
    );
});

/**
 * Delete Resume
 */
const deleteResumeController = asyncHandler(async (req, res) => {

    await deleteResume(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RESUME_DELETED
        )
    );
});
/**
 * Upload Resume PDF
 */
const uploadResumeController =
asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.FILE_REQUIRED
        );
    }

    const uploadedFile =
        await uploadToCloudinary(
            req.file.buffer,
            "resumes"
        );

    const resume =
        await uploadResume(
            req.params.id,
            req.user.id,
            uploadedFile,
            req.file.originalname
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RESUME_UPLOADED,
            resume
        )
    );
});

/**
 * Download Resume
 */
const downloadResumeController =
asyncHandler(async (req, res) => {

    const result = await downloadResume(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RESUME_FETCHED,
            result
        )
    );
});

module.exports = {
    createResumeController,
    getMyResumeController,
    updateResumeController,
    uploadResumeController,
    deleteResumeController,
    downloadResumeController
};