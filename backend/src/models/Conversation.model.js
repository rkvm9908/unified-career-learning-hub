const mongoose = require("mongoose");

const { Schema } = mongoose;

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],

        participantCount: {
            type: Number,
            default: 2
        },

        unreadCounts: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                count: {
                    type: Number,
                    default: 0
                }
            }
        ],

        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null
        },

        lastMessageAt: {
            type: Date,
            default: null
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

// Find conversation by participants
conversationSchema.index({
    participants: 1
});

// Recent conversations
conversationSchema.index({
    lastMessageAt: -1
});

module.exports = mongoose.model(
    "Conversation",
    conversationSchema
);