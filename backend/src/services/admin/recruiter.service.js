const User = require("../../models/user.model");

const ApiError = require("../../utils/ApiError");
const RESPONSE_MESSAGES = require("../../constants/responseMessages");

const ROLES = require("../../constants/roles");

/**
 * Get All Recruiters
 */
const getAllRecruiters = async (query) => {
    const {
        search,
        isApproved,
        page = 1,
        limit = 10
    } = query;

    const filter = {
        role: ROLES.RECRUITER,
        isActive: true
    };

    if (search) {
        filter.$or = [
            {
                firstName: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                lastName: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                email: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if (isApproved !== undefined) {
        filter.isApproved = isApproved === "true";
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [recruiters, total] = await Promise.all([
        User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        User.countDocuments(filter)
    ]);

    return {
        recruiters,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
        }
    };
};

/**
 * Approve Recruiter
 */
const approveRecruiter = async (recruiterId) => {
    const recruiter = await User.findOne({
        _id: recruiterId,
        role: ROLES.RECRUITER,
        isActive: true
    });

    if (!recruiter) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RECRUITER_NOT_FOUND
        );
    }

    recruiter.isApproved = true;

    await recruiter.save();

    return recruiter;
};

/**
 * Reject Recruiter
 */
const rejectRecruiter = async (recruiterId) => {
    const recruiter = await User.findOne({
        _id: recruiterId,
        role: ROLES.RECRUITER,
        isActive: true
    });

    if (!recruiter) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.RECRUITER_NOT_FOUND
        );
    }

    recruiter.isApproved = false;

    await recruiter.save();

    return recruiter;
};

module.exports = {
    getAllRecruiters,
    approveRecruiter,
    rejectRecruiter
};