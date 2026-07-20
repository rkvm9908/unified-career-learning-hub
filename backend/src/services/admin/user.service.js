const User = require("../../models/user.model");

const ApiError = require("../../utils/ApiError");

const RESPONSE_MESSAGES = require("../../constants/responseMessages");

/**
 * Get All Users
 */
const getAllUsers = async (query) => {
    const {
        role,
        search,
        isActive,
        page = 1,
        limit = 10
    } = query;

    const filter = {};

    if (role) {
        filter.role = role;
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === "true";
    }

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

    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
        User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        User.countDocuments(filter)
    ]);

    return {
        users,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
        }
    };
};

/**
 * Get User By ID
 */
const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    return user;
};

/**
 * Update User Status
 */
const updateUserStatus = async (
    userId,
    isActive
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    user.isActive = isActive;

    await user.save();

    return user;
};

/**
 * Soft Delete User
 */
const deleteUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    user.isActive = false;

    await user.save();
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserStatus,
    deleteUser
};