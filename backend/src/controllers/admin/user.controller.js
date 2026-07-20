const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../../constants/responseMessages");

const {
    getAllUsers,
    getUserById,
    updateUserStatus,
    deleteUser
} = require("../../services/admin/user.service");

/**
 * Get All Users
 */
const getAllUsersController = asyncHandler(async (req, res) => {
    const result = await getAllUsers(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.USERS_FETCHED,
            result
        )
    );
});

/**
 * Get User By ID
 */
const getUserByIdController = asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.USER_FETCHED,
            user
        )
    );
});

/**
 * Update User Status
 */
const updateUserStatusController = asyncHandler(async (req, res) => {
    const user = await updateUserStatus(
        req.params.id,
        req.body.isActive
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.USER_UPDATED,
            user
        )
    );
});

/**
 * Delete User
 */
const deleteUserController = asyncHandler(async (req, res) => {
    await deleteUser(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.USER_DELETED
        )
    );
});

module.exports = {
    getAllUsersController,
    getUserByIdController,
    updateUserStatusController,
    deleteUserController
};