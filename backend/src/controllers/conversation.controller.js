const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES =
    require("../constants/responseMessages");

const {
    getMyConversations,
    getConversationById,
    markConversationAsRead,
    deleteConversation
} = require("../services/conversation.service");

/**
 * Get My Conversations
 */
const getMyConversationsController =
asyncHandler(async (req, res) => {

    const conversations =
        await getMyConversations(
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CONVERSATIONS_FETCHED,
            conversations
        )
    );

});

/**
 * Get Conversation
 */
const getConversationByIdController =
asyncHandler(async (req, res) => {

    const conversation =
        await getConversationById(
            req.params.conversationId,
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CONVERSATION_FETCHED,
            conversation
        )
    );

});

/**
 * Mark Conversation Read
 */
const markConversationAsReadController =
asyncHandler(async (req, res) => {

    const conversation =
        await markConversationAsRead(
            req.params.conversationId,
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CONVERSATION_MARKED_READ,
            conversation
        )
    );

});

/**
 * Delete Conversation
 */
const deleteConversationController =
asyncHandler(async (req, res) => {

    await deleteConversation(
        req.params.conversationId,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.CONVERSATION_DELETED
        )
    );

});

module.exports = {
    getMyConversationsController,
    getConversationByIdController,
    markConversationAsReadController,
    deleteConversationController
};