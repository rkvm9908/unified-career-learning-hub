const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    createNotification,
    getMyNotifications,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require("../services/notification.service");

/**
 * Create Notification
 * (Internal Use)
 */
const createNotificationController =
asyncHandler(async (req, res) => {

    const notification =
        await createNotification(
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.NOTIFICATION_CREATED,
            notification
        )
    );
});

/**
 * Get My Notifications
 */
const getMyNotificationsController =
asyncHandler(async (req, res) => {

    const notifications =
        await getMyNotifications(
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.NOTIFICATIONS_FETCHED,
            notifications
        )
    );
});

/**
 * Get Unread Notifications
 */
const getUnreadNotificationsController =
asyncHandler(async (req, res) => {

    const notifications =
        await getUnreadNotifications(
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.NOTIFICATIONS_FETCHED,
            notifications
        )
    );
});

/**
 * Mark Notification As Read
 */
const markAsReadController =
asyncHandler(async (req, res) => {

    const notification =
        await markAsRead(
            req.params.id,
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.NOTIFICATION_UPDATED,
            notification
        )
    );
});

/**
 * Mark All Notifications As Read
 */
const markAllAsReadController =
asyncHandler(async (req, res) => {

    await markAllAsRead(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.ALL_NOTIFICATIONS_READ
        )
    );
});

/**
 * Delete Notification
 */
const deleteNotificationController =
asyncHandler(async (req, res) => {

    await deleteNotification(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.NOTIFICATION_DELETED
        )
    );
});

module.exports = {
    createNotificationController,
    getMyNotificationsController,
    getUnreadNotificationsController,
    markAsReadController,
    markAllAsReadController,
    deleteNotificationController
};