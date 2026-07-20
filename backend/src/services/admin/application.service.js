const Application = require("../../models/Application.model");
const ApiError = require("../../utils/ApiError");
const RESPONSE_MESSAGES = require("../../constants/responseMessages");
const { mapApplication } = require("../../mappers/application.mapper");
const { APPLICATION_STATUS } = require("../../constants/status");
/**
 * Get All Applications
 */
const getAllApplicationsAdmin = async (query) => {

    const {
        page = 1,
        limit = 10,
        search,
        status,
        applicant,
        recruiter,
        job,
        sort = "latest"
    } = query;

    const filter = {};

    if (status) {
        filter.status = status;
    }

    if (applicant) {
        filter.applicant = applicant;
    }

    if (recruiter) {
        filter.recruiter = recruiter;
    }

    if (job) {
        filter.job = job;
    }

    const sortOption =
        sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };

    const skip =
        (Number(page) - 1) *
        Number(limit);

    const applications = await Application.find(filter)
        .populate(
            "applicant",
            "firstName lastName username email profileImage"
        )
        .populate(
            "recruiter",
            "firstName lastName username email profileImage"
        )
        .populate(
            "job",
            "title company companyLogo"
        )
        .populate(
            "resume"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    let filteredApplications = applications;

    if (search) {

        const keyword = search.toLowerCase();

        filteredApplications = applications.filter(
            (application) =>
                application.job?.title
                    ?.toLowerCase()
                    .includes(keyword) ||
                application.job?.company
                    ?.toLowerCase()
                    .includes(keyword) ||
                application.applicant?.firstName
                    ?.toLowerCase()
                    .includes(keyword) ||
                application.applicant?.lastName
                    ?.toLowerCase()
                    .includes(keyword) ||
                application.applicant?.username
                    ?.toLowerCase()
                    .includes(keyword)
        );

    }

    const total =
        await Application.countDocuments(filter);

    return {

        applications:
            filteredApplications.map(mapApplication),
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(
                total / Number(limit)
            )
        }
    };
};

/**
 * Get Application By Id
 */
const getApplicationByIdAdmin = async (
    applicationId
) => {

    const application =
        await Application.findById(applicationId)
            .populate(
                "applicant",
                "firstName lastName username email profileImage"
            )
            .populate(
                "recruiter",
                "firstName lastName username email profileImage"
            )
            .populate(
                "job",
                "title company companyLogo"
            )
            .populate("resume");

    if (!application) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND
        );
    }
    return mapApplication(application);
};

/**
 * Update Application Status
 */
const updateApplicationStatus = async (
    applicationId,
    status
) => {

    if (
        !Object.values(APPLICATION_STATUS).includes(status)
    ) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.INVALID_APPLICATION_STATUS
        );
    }

    const application =
        await Application.findById(applicationId);
    if (!application) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND
        );
    }

    application.status = status;
    await application.save();
    return mapApplication(application);

};

/**
 * Delete Application
 */
const deleteApplicationAdmin = async (
    applicationId
) => {

    const application =
        await Application.findById(applicationId);

    if (!application) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND
        );
    }

    if (!application.isActive) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.APPLICATION_ALREADY_DELETED
        );
    }

    application.isActive = false;
    await application.save();
    return mapApplication(application);

};

/**
 * Restore Application
 */
const restoreApplicationAdmin = async (
    applicationId
) => {

    const application =
        await Application.findById(applicationId);

    if (!application) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.APPLICATION_NOT_FOUND
        );
    }

    if (application.isActive) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.APPLICATION_ALREADY_ACTIVE
        );
    }

    application.isActive = true;
    await application.save();
    return mapApplication(application);

};

module.exports = {
    getAllApplicationsAdmin,
    getApplicationByIdAdmin,
    updateApplicationStatus,
    deleteApplicationAdmin,
    restoreApplicationAdmin
};