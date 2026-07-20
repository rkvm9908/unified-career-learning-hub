const Job = require("../../models/job.model");
const ApiError = require("../../utils/ApiError");
const RESPONSE_MESSAGES = require("../../constants/responseMessages");
const { JOB_STATUS } = require("../../constants/status");
const { mapJob } = require("../../mappers/job.mapper");

/**
 * Get All Jobs
 */
const getAllJobsAdmin = async (query) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        recruiter,
        featured,
        sort = "latest"
    } = query;

    const filter = {};

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                company: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if (status) {
        filter.status = status;
    }

    if (recruiter) {
        filter.owner = recruiter;
    }

    if (featured !== undefined) {
        filter.isFeatured = featured === "true";
    }

    const sortOption =
        sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };

    const skip =
        (Number(page) - 1) *
        Number(limit);

    const jobs = await Job.find(filter)
        .populate(
            "owner",
            "firstName lastName username profileImage email"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total =
        await Job.countDocuments(filter);

    return {
        jobs: jobs.map(mapJob),

        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

/**
 * Get Job By Id
 */
const getJobByIdAdmin = async (jobId) => {
    const job = await Job.findById(jobId)
        .populate(
            "owner",
            "firstName lastName username email profileImage"
        );

    if (!job) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    return mapJob(job);
};
/**
 * Update Job Status
 */
const updateJobStatus = async (
    jobId,
    status
) => {

    if (
        !Object.values(JOB_STATUS).includes(status)
    ) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.INVALID_JOB_STATUS
        );
    }

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    job.status = status;
    await job.save();
    return mapJob(job);

};
/**
 * Toggle Featured Job
 */
const toggleFeaturedJobAdmin = async (
    jobId
) => {

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    job.isFeatured = !job.isFeatured;

    await job.save();

    return mapJob(job);

};
/**
 * Soft Delete Job
 */
const deleteJobAdmin = async (
    jobId
) => {

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }
    if (!job.isActive) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.JOB_ALREADY_DELETED
        );
    }

    job.isActive = false;
    await job.save();
    return mapJob(job);

};
/**
 * Restore Job
 */
const restoreJobAdmin = async (
    jobId
) => {

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    if (job.isActive) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.JOB_ALREADY_ACTIVE
        );
    }

    job.isActive = true;
    await job.save();
    return mapJob(job);

};
module.exports = {
    getAllJobsAdmin,
    getJobByIdAdmin,
    updateJobStatus,
    toggleFeaturedJobAdmin,
    deleteJobAdmin,
    restoreJobAdmin
};