const express = require("express");

const {
    sendMessageController,
    getMessagesController,
    editMessageController,
    deleteMessageController,
    markMessageAsReadController
} = require("../controllers/message.controller");
const { uploadMessageAttachment } = require("../middleware/upload.middleware");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
    sendMessageSchema,
    updateMessageSchema
} = require("../validators/message.validator");

const router = express.Router();

/**
 * Message Routes
 */

// Send Message
router.post(
    "/:receiverId",
    protect,
    uploadMessageAttachment.single("attachment"),
    validate(sendMessageSchema),
    sendMessageController
);

// Get Messages
router.get(
    "/conversation/:conversationId",
    protect,
    getMessagesController
);

// Edit Message
router.patch(
    "/:messageId",
    protect,
    validate(updateMessageSchema),
    editMessageController
);

// Delete Message
router.delete(
    "/:messageId",
    protect,
    deleteMessageController
);

// Mark Message As Read
router.patch(
    "/:messageId/read",
    protect,
    markMessageAsReadController
);

module.exports = router;