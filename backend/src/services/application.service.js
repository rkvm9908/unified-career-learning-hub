// ============================
// Imports 
// ============================

const mongoose = require("mongoose");

const Application = require("../models/application.model");
const Job = require("../models/job.model");
const Resume = require("../models/resume.model");

const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    createNotification
} = require("./notification.service");

// ============================
// Functions 
// ============================

/**
 * Apply Job
 */
const applyJob = async (
    applicantId,
    applicationData
) => {

    const session =
        await mongoose.startSession();
    session.startTransaction();
    try {
        const {
            jobId,
            resumeId,
            coverLetter
        } = applicationData;

        /**
         * Check Job
         */
        const job =
            await Job.findById(jobId).session(session);
        if (!job) {
            throw new ApiError(
                404,
                RESPONSE_MESSAGES.JOB_NOT_FOUND
            );
        }
        if (
            job.status !== "Open" ||
            !job.isActive
        ) {
            throw new ApiError(
                400,
                RESPONSE_MESSAGES.JOB_CLOSED
            );
        }

        /**
         * Check Resume
         */
        const resume =
            await Resume.findOne({
                _id: resumeId,
                owner: applicantId,
                isActive: true
            }).session(session);
        if (!resume) {
            throw new ApiError(
                404,
                RESPONSE_MESSAGES.RESUME_NOT_FOUND
            );
        }

        /**
         * Prevent Duplicate Application
         */
        const alreadyApplied =
            await Application.findOne({
                applicant: applicantId,
                job: jobId
            }).session(session);
        if (alreadyApplied) {
            throw new ApiError(
                409,
                RESPONSE_MESSAGES.ALREADY_APPLIED
            );
        }

        /**
         * Create Application
         */
        const application =
            await Application.create(
                [
                    {
                        applicant:
                            applicantId,
                        recruiter:
                            job.owner,
                        job:
                            jobId,
                        resume:
                            resumeId,
                        coverLetter
                    }
                ],
                {
                    session
                }
            );

        /**
         * Update Job Count
         */
        job.applicantsCount += 1;
        await job.save({
            session
        });

        /**
         * Notification
         */
        await createNotification({
            recipient:
                job.owner,
            sender:
                applicantId,
            type:
                "APPLICATION",
            title:
                "New Job Application",
            message:
                "A new application has been submitted.",
            referenceModel:
                "Application",
            referenceId:
                application[0]._id
        });
        await session.commitTransaction();
        return application[0];
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

/**
 * Get My Applications
 */
const getMyApplications = async (
    applicantId
) => {

    const applications =
        await Application.find({

            applicant: applicantId,

            isActive: true

        })
            .populate(
                "job",
                "title company location status"
            )
            .populate(
                "resume",
                "title"
            )
            .sort({
                createdAt: -1
            });

    return applications;

};

/**
 * Get Application By ID
 */
const getApplicationById = async (
    applicationId,
    currentUserId
) => {

    const application =
        await Application.findOne({
            _id: applicationId,
            isActive: true

        })
            .populate(
                "applicant",
                "firstName lastName username email profileImage"
            )
            .populate(
                "recruiter",
                "firstName lastName username"
            )
            .populate(
                "job"
            )
            .populate(
                "resume"
            );

    if (!application) {

        throw new ApiError(

            404,

            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    const isApplicant =
        application.applicant._id.toString() ===
        currentUserId.toString();

    const isRecruiter =
        application.recruiter._id.toString() ===
        currentUserId.toString();

    if (
        !isApplicant &&
        !isRecruiter
    ) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    return application;

};

/**
 * Get Applications By Job
 */
const getApplicationsByJob = async (
    jobId,
    recruiterId
) => {

    const job =
        await Job.findOne({

            _id: jobId,

            owner: recruiterId,

            isActive: true

        });

    if (!job) {

        throw new ApiError(

            404,

            RESPONSE_MESSAGES.JOB_NOT_FOUND

        );

    }

    const applications =
        await Application.find({

            job: jobId,

            isActive: true

        })
            .populate(
                "applicant",
                "firstName lastName username email profileImage"
            )
            .populate(
                "resume",
                "title"
            )
            .sort({
                createdAt: -1
            });

    return applications;

};

/**
 * Update Application Status
 */
const updateApplicationStatus = async (
    applicationId,
    recruiterId,
    updateData
) => {

    const application =
        await Application.findOne({

            _id: applicationId,

            recruiter: recruiterId,

            isActive: true

        });

    if (!application) {

        throw new ApiError(

            404,

            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    application.status =
        updateData.status;

    if (
        updateData.notes !== undefined
    ) {

        application.notes =
            updateData.notes;

    }

    if (
        updateData.interviewDate !== undefined
    ) {

        application.interviewDate =
            updateData.interviewDate;

    }

    await application.save();

    await createNotification({

        recipient:
            application.applicant,

        sender:
            recruiterId,
        type:
            "APPLICATION",
        title:
            "Application Status Updated",
        message:
            `Your application status has been updated to ${application.status}.`,
        referenceModel:
            "Application",
        referenceId:
            application._id

    });

    return application;

};

/**
 * Update Application
 */
const updateApplication = async (
    applicationId,
    applicantId,
    updateData
) => {

    const application =
        await Application.findOne({

            _id: applicationId,

            applicant: applicantId,

            status: "Pending",

            isActive: true

        });

    if (!application) {

        throw new ApiError(

            404,

            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    application.coverLetter =
        updateData.coverLetter;

    await application.save();

    return application;

};

/**
 * Withdraw Application
 */
const withdrawApplication = async (
    applicationId,
    applicantId
) => {

    const application =
        await Application.findOne({

            _id: applicationId,

            applicant: applicantId,

            isActive: true

        });

    if (!application) {

        throw new ApiError(

            404,

            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    application.status =
        "Withdrawn";

    await application.save();

    return application;

};

/**
 * Delete Application
 */
const deleteApplication = async (
    applicationId,
    applicantId
) => {

    const application =
        await Application.findOne({

            _id: applicationId,

            applicant: applicantId,

            isActive: true

        });

    if (!application) {

        throw new ApiError(

            404,

            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    application.isActive = false;

    await application.save();

    return;

};


// ============================
// Exports 
// ============================

module.exports = {
    applyJob,
    getMyApplications,
    getApplicationById,
    getApplicationsByJob,
    updateApplicationStatus,
    updateApplication,
    withdrawApplication,
    deleteApplication
};
