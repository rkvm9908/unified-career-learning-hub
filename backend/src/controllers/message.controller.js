const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES =
    require("../constants/responseMessages");

const {
    notifyMessage
} = require("../utils/notification.helper");
const {
    emitToConversation
} = require("../constants/socketEvents");
const {
    sendMessage,
    getMessages,
    editMessage,
    deleteMessage,
    markMessageAsRead
} = require("../services/message.service");

/**
 * Send Message
 */
const sendMessageController =
asyncHandler(async (req, res) => {

    const result =
        await sendMessage(
            req.user.id,
            req.params.receiverId,
            req.body,
            req.file
        );

    /**
     * Notification
     */
    await notifyMessage({

        recipientId:
            result.receiverId,

        senderId:
            req.user.id,

        conversationId:
            result.conversationId

    });
    /**
     * Realtime Message
     */
    emitToConversation(
        result.conversationId,
        "message:new",
        result.message
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.MESSAGE_SENT,
            result.message
        )
    );
});

/**
 * Get Messages
 */
const getMessagesController =
asyncHandler(async (req, res) => {

    const messages =
        await getMessages(
            req.params.conversationId,
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.MESSAGES_FETCHED,
            messages
        )
    );
});

/**
 * Edit Message
 */
const editMessageController =
asyncHandler(async (req, res) => {

    const message =
        await editMessage(
            req.params.messageId,
            req.user.id,
            req.body.content
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.MESSAGE_UPDATED,
            message
        )
    );
});

/**
 * Delete Message
 */
const deleteMessageController =
asyncHandler(async (req, res) => {

    await deleteMessage(
        req.params.messageId,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.MESSAGE_DELETED
        )
    );
});

/**
 * Mark Message As Read
 */
const markMessageAsReadController =
asyncHandler(async (req, res) => {

    const message =
        await markMessageAsRead(
            req.params.messageId,
            req.user.id
        );
    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.MESSAGE_UPDATED,
            message
        )
    );
});

module.exports = {
    sendMessageController,
    getMessagesController,
    editMessageController,
    deleteMessageController,
    markMessageAsReadController
};