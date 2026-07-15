const Notification = require("../models/Notification.model");

const ApiError = require("../utils/ApiError");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Safe Notification Response
 */
const getSafeNotification = (notification) => {

    return {
        id: notification._id,

        recipient: notification.recipient,

        sender: notification.sender,

        type: notification.type,

        title: notification.title,

        message: notification.message,

        referenceId: notification.referenceId,

        referenceModel: notification.referenceModel,

        isRead: notification.isRead,

        createdAt: notification.createdAt
    };
};

/**
 * Create Notification
 */
const createNotification = async (notificationData) => {

    const notification =
        await Notification.create(notificationData);

    return getSafeNotification(notification);
};

/**
 * Get My Notifications
 */
const getMyNotifications = async (userId) => {

    const notifications =
        await Notification.find({
            recipient: userId,
            isActive: true
        })
        .populate(
            "sender",
            "firstName lastName username profileImage"
        )
        .sort({
            createdAt: -1
        });

    return notifications.map(getSafeNotification);
};

/**
 * Get Unread Notifications
 */
const getUnreadNotifications = async (userId) => {

    const notifications =
        await Notification.find({
            recipient: userId,
            isRead: false,
            isActive: true
        })
        .populate(
            "sender",
            "firstName lastName username profileImage"
        )
        .sort({
            createdAt: -1
        });

    return notifications.map(getSafeNotification);
};

/**
 * Mark Notification As Read
 */
const markAsRead = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOne({
            _id: notificationId,
            recipient: userId,
            isActive: true
        });

    if (!notification) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.NOTIFICATION_NOT_FOUND
        );

    }

    notification.isRead = true;

    await notification.save();

    return getSafeNotification(notification);
};

/**
 * Mark All Notifications As Read
 */
const markAllAsRead = async (userId) => {

    await Notification.updateMany(
        {
            recipient: userId,
            isRead: false,
            isActive: true
        },
        {
            $set: {
                isRead: true
            }
        }
    );

    return;
};

/**
 * Delete Notification
 */
const deleteNotification = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOne({
            _id: notificationId,
            recipient: userId,
            isActive: true
        });

    if (!notification) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.NOTIFICATION_NOT_FOUND
        );

    }

    notification.isActive = false;

    await notification.save();

    return;
};

module.exports = {
    createNotification,
    getMyNotifications,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getSafeNotification
};