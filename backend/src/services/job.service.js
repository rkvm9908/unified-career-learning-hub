const Job = require("../models/Job.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Safe Job Response
 */
const getSafeJob = (
    job
) => {

    const owner = job.owner;

    return {
        id: job._id,

        title: job.title,

        company: job.company,

        companyLogo: job.companyLogo,

        location: job.location,

        workMode: job.workMode,

        employmentType: job.employmentType,

        experienceLevel: job.experienceLevel,

        salary: job.salary,

        currency: job.currency,

        skills: job.skills,

        description: job.description,

        responsibilities: job.responsibilities,

        qualifications: job.qualifications,

        benefits: job.benefits,

        applicationDeadline:
            job.applicationDeadline,

        vacancies: job.vacancies,

        owner: owner
            ? {
                    id: owner._id,
                    firstName: owner.firstName,
                    lastName: owner.lastName,
                    username: owner.username,
                    profileImage: owner.profileImage
                }
            : null,

        applicantsCount:
            job.applicantsCount,

        viewsCount:
            job.viewsCount,

        status: job.status,

        isFeatured:
            job.isFeatured,

        isActive:
            job.isActive,

        createdAt:
            job.createdAt,

        updatedAt:
            job.updatedAt
    };
};

/**
 * Create Job
 */
const createJob = async (
    userId,
    jobData
) => {

    const job = await Job.create({
        ...jobData,
        owner: userId
    });

    return getSafeJob(job);
};
/**
 * Get My Jobs
 */
const getMyJobs = async (userId) => {

    const jobs = await Job.find({
        owner: userId,
        isActive: true
    })
    .sort({
        createdAt: -1
    });

    return jobs.map(getSafeJob);
};
/**
 * Get Job By ID
 */
const getJobById = async (
    jobId,
    currentUserId = null
) => {

    const job = await Job.findOne({
        _id: jobId,
        isActive: true
    })
    .populate(
        "owner",
        "firstName lastName username profileImage"
    );

    if (!job) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    // Increment views count
    job.viewsCount += 1;

    await job.save();

    return getSafeJob(
        job,
        currentUserId
    );
};
/**
 * Update Job
 */
const updateJob = async (
    jobId,
    userId,
    jobData
) => {

    const job = await Job.findById(jobId);

    if (!job || !job.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    // Check Ownership
    if (job.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    Object.assign(
        job,
        jobData
    );

    await job.save();

    return getSafeJob(job);
};
/**
 * Delete Job
 */
const deleteJob = async (
    jobId,
    userId
) => {

    const job = await Job.findById(jobId);

    if (!job || !job.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );
    }

    // Check Ownership
    if (job.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    // Soft Delete
    job.isActive = false;

    await job.save();

    return;
};
/**
 * Get All Jobs
 */
const getAllJobs = async (
    query
) => {

    const {
        page = 1,
        limit = 10,
        search,
        location,
        workMode,
        employmentType,
        experienceLevel,
        sort = "latest"
    } = query;

    const filter = {
        isActive: true,
        status: "Open"
    };

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

    if (location) {
        filter.location = {
            $regex: location,
            $options: "i"
        };
    }

    if (workMode) {
        filter.workMode = workMode;
    }

    if (employmentType) {
        filter.employmentType =
            employmentType;
    }

    if (experienceLevel) {
        filter.experienceLevel =
            experienceLevel;
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
            "firstName lastName username profileImage"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total =
        await Job.countDocuments(filter);

    return {

        jobs: jobs.map(getSafeJob),

        pagination: {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(
                total / limit
            )
        }
    };
};

/**
 * Toggle Featured Job
 */
const toggleFeaturedJob = async (
    jobId
) => {

    const job =
        await Job.findById(jobId);

    if (!job) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );

    }

    job.isFeatured =
        !job.isFeatured;

    await job.save();

    return getSafeJob(job);
};

/**
 * Get Featured Jobs
 */
const getFeaturedJobs = async () => {

    const jobs = await Job.find({
        isFeatured: true,
        isActive: true,
        status: "Open"
    })
    .populate(
        "owner",
        "firstName lastName username profileImage"
    )
    .sort({
        createdAt: -1
    });

    return jobs.map((job) => getSafeJob(job));
};

/**
 * Upload Company Logo
 */
const uploadCompanyLogo = async (
    jobId,
    userId,
    uploadedLogo
) => {

    const job =
        await Job.findById(jobId);

    if (!job || !job.isActive) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.JOB_NOT_FOUND
        );

    }

    if (
        job.owner.toString() !==
        userId
    ) {

        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );

    }

    job.companyLogo = {

        url:
            uploadedLogo.secure_url,

        publicId:
            uploadedLogo.public_id
    };

    await job.save();

    return getSafeJob(job);
};

module.exports = {
    createJob,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob,
    getAllJobs,
    getFeaturedJobs,
    toggleFeaturedJob,
    uploadCompanyLogo,
    getSafeJob
};