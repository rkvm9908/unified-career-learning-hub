const mongoose = require("mongoose");
const { MESSAGE_TYPE } = require("../constants/enums");

const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true
        },

        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        messageType: {
            type: String,
            enum: Object.values(MESSAGE_TYPE),
            default: MESSAGE_TYPE.TEXT,
        },

        content: {
            type: String,
            trim: true,
            default: ""
        },

        attachment: {
            url: {
                type: String,
                default: ""
            },

            publicId: {
                type: String,
                default: ""
            },

            originalName: {
                type: String,
                default: ""
            },

            mimeType: {
                type: String,
                default: ""
            },

            size: {
                type: Number,
                default: 0
            }
        },

        replyTo: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null
        },

        readBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        isEdited: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/**
 * Indexes
 */

// Conversation messages
messageSchema.index({
    conversation: 1,
    createdAt: 1
});

// Sender history
messageSchema.index({
    sender: 1,
    createdAt: -1
});

// Reply lookup
messageSchema.index({
    replyTo: 1
});

module.exports = mongoose.models.Message || mongoose.model(
    "Message",
    messageSchema
);