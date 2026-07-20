// imports
const Conversation = require("../models/Conversation.model");
const Message = require("../models/Message.model");
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { notifyMessage } = require("../utils/notification.helper");
const { uploadToCloudinary } = require("../config/cloudinary");

/**
 * Safe Message Response
 */
const getSafeMessage = (message) => {

    return {

        id: message._id,
        conversation: message.conversation,
        sender: message.sender,
        messageType: message.messageType,
        content: message.isDeleted
            ? "This message was deleted."
            : message.content,

        attachment: message.attachment,
        replyTo: message.replyTo,
        readBy: message.readBy,
        isEdited: message.isEdited,
        isDeleted: message.isDeleted,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt

    };

};
/**
 * Send Message
 */
const sendMessage = async (
    senderId,
    receiverId,
    messageData,
    file
) => {

    if (senderId === receiverId) {

        throw new ApiError(
            400,
            RESPONSE_MESSAGES.CANNOT_MESSAGE_SELF
        );

    }

    const receiver =
        await User.findById(receiverId);

    if (!receiver || !receiver.isActive) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );

    }

    /**
     * Find Existing Conversation
     */
    let conversation =
        await Conversation.findOne({
            participants: {
                $all: [
                    senderId,
                    receiverId
                ]
            },
            participantCount: 2,
            isActive: true
        });

    /**
     * Create Conversation
     */
    if (!conversation) {

        conversation =
            await Conversation.create({

                participants: [
                    senderId,
                    receiverId
                ],

                participantCount: 2,

                unreadCounts: [
                    {
                        user: senderId,
                        count: 0
                    },
                    {
                        user: receiverId,
                        count: 0
                    }
                ]
            });

    }

    /**
 * Upload Attachment
 */
let attachment = {};

let messageType =
    messageData.messageType;

if (file) {

    const uploadedFile =
        await uploadToCloudinary(
            file.buffer,
            "chat"
        );

    attachment = {

        url: uploadedFile.secure_url,

        publicId: uploadedFile.public_id,

        originalName:
            file.originalname,

        mimeType:
            file.mimetype,

        size:
            file.size

    };

    if (
        file.mimetype.startsWith("image/")
    ) {

        messageType = "IMAGE";

    } else if (

        file.mimetype.startsWith("audio/")

    ) {

        messageType = "VOICE";

    } else {

        messageType = "FILE";

    }

}

    /**
     * Create Message
     */
    const message =
        await Message.create({

            conversation:
                conversation._id,

            sender: senderId,

            content:
                messageData.content,

            searchText:
                messageData.content
                    ? messageData.content
                        .toLowerCase()
                        .trim()
                    : "",

            messageType:
                messageType,

            attachment,

            replyTo:
                messageData.replyTo || null

        });

    /**
     * Update Conversation
     */
    conversation.lastMessage =
        message._id;

    conversation.lastMessageAt =
        message.createdAt;

    const unread =
        conversation.unreadCounts.find(
            item =>
                item.user.toString() ===
                receiverId.toString()
        );

    if (unread) {

        unread.count += 1;

    }

    await conversation.save();

    /**
     * Notification
     */
    await notifyMessage({

        recipientId: receiverId,

        senderId,

        conversationId:
            conversation._id

    });

    return {
    message: getSafeMessage(message),
    conversationId: conversation._id,
    receiverId
};
};

/**
 * Get Messages
 */
const getMessages = async (
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

    const messages =
        await Message.find({

            conversation: conversationId,

            isActive: true

        })
            .populate(
                "sender",
                "firstName lastName username profileImage"
            )
            .populate({
                path: "replyTo",
                select: "content sender"
            })
            .sort({
                createdAt: 1
            });

    return messages.map(getSafeMessage);

};

/**
 * Edit Message
 */
const editMessage = async (
    messageId,
    userId,
    content
) => {

    const message =
        await Message.findById(
            messageId
        );

    if (
        !message ||
        !message.isActive
    ) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.MESSAGE_NOT_FOUND
        );

    }

    if (
        message.sender.toString() !==
        userId.toString()
    ) {

        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );

    }

    message.content = content;

    message.searchText =
    content
        ? content
            .toLowerCase()
            .trim()
        : "";

    message.isEdited = true;

    await message.save();

    return getSafeMessage(message);

};

/**
 * Delete Message
 */
const deleteMessage = async (
    messageId,
    userId
) => {

    const message =
        await Message.findById(
            messageId
        );

    if (
        !message ||
        !message.isActive
    ) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.MESSAGE_NOT_FOUND
        );

    }

    if (
        message.sender.toString() !==
        userId.toString()
    ) {

        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );

    }

    message.isDeleted = true;

    message.content =
        "This message was deleted.";

    message.searchText = "";

    await message.save();

    return;

};

/**
 * Mark Message As Read
 */
const markMessageAsRead = async (
    messageId,
    userId
) => {

    const message =
        await Message.findById(
            messageId
        );

    if (
        !message ||
        !message.isActive
    ) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.MESSAGE_NOT_FOUND
        );

    }

    const alreadyRead =
        message.readBy.some(

            id =>
                id.toString() ===
                userId.toString()

        );

    if (!alreadyRead) {

        message.readBy.push(
            userId
        );

        await message.save();

    }

    return getSafeMessage(message);

};

module.exports = {
    getSafeMessage,
    sendMessage,
    getMessages,
    editMessage,
    deleteMessage,
    markMessageAsRead
};