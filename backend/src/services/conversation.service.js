const Conversation = require("../models/Conversation.model");

const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Get My Conversations
 */
const getMyConversations = async (userId) => {

    const conversations =
        await Conversation.find({
            participants: userId,
            isActive: true
        })
            .populate(
                "participants",
                "firstName lastName username profileImage"
            )
            .populate({
                path: "lastMessage",
                select:
                    "content messageType sender createdAt isDeleted"
            })
            .sort({
                lastMessageAt: -1
            });

    return conversations;
};

/**
 * Get Conversation By ID
 */
const getConversationById = async (
    conversationId,
    userId
) => {

    const conversation =
        await Conversation.findOne({
            _id: conversationId,
            participants: userId,
            isActive: true
        })
            .populate(
                "participants",
                "firstName lastName username profileImage"
            )
            .populate({
                path: "lastMessage",
                select:
                    "content messageType sender createdAt isDeleted"
            });

    if (!conversation) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CONVERSATION_NOT_FOUND
        );

    }

    return conversation;
};

/**
 * Mark Conversation As Read
 */
const markConversationAsRead = async (
    conversationId,
    userId
) => {

    const conversation =
        await Conversation.findOne({
            _id: conversationId,
            participants: userId,
            isActive: true
        });

    if (!conversation) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CONVERSATION_NOT_FOUND
        );

    }

    const unread =
        conversation.unreadCounts.find(
            item =>
                item.user.toString() ===
                userId.toString()
        );

    if (unread) {

        unread.count = 0;

        await conversation.save();

    }

    return conversation;
};

/**
 * Delete Conversation
 */
const deleteConversation = async (
    conversationId,
    userId
) => {

    const conversation =
        await Conversation.findOne({
            _id: conversationId,
            participants: userId,
            isActive: true
        });

    if (!conversation) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CONVERSATION_NOT_FOUND
        );

    }

    conversation.isActive = false;

    await conversation.save();

    return;
};

module.exports = {
    getMyConversations,
    getConversationById,
    markConversationAsRead,
    deleteConversation
};