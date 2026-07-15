const express = require("express");

const {
    getMyNotificationsController,
    getUnreadNotificationsController,
    markAsReadController,
    markAllAsReadController,
    deleteNotificationController
} = require("../controllers/notification.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * Notification Routes
 */

// Get My Notifications
router.get(
    "/",
    protect,
    getMyNotificationsController
);

// Get Unread Notifications
router.get(
    "/unread",
    protect,
    getUnreadNotificationsController
);

// Mark All Notifications As Read
router.patch(
    "/read-all",
    protect,
    markAllAsReadController
);

// Mark Single Notification As Read
router.patch(
    "/:id/read",
    protect,
    markAsReadController
);

// Delete Notification
router.delete(
    "/:id",
    protect,
    deleteNotificationController
);

module.exports = router;