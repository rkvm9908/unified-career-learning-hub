const express = require("express");

const {
    getMyConversationsController,
    getConversationByIdController,
    markConversationAsReadController,
    deleteConversationController
} = require("../controllers/conversation.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * Conversation Routes
 */

router.get(
    "/",
    protect,
    getMyConversationsController
);

router.get(
    "/:conversationId",
    protect,
    getConversationByIdController
);

router.patch(
    "/:conversationId/read",
    protect,
    markConversationAsReadController
);

router.delete(
    "/:conversationId",
    protect,
    deleteConversationController
);

module.exports = router;