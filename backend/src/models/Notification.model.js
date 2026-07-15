const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificationSchema = new Schema(
    {
        recipient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        type: {
            type: String,
            enum: [
                "LIKE_PROJECT",
                "COMMENT_PROJECT",
                "FOLLOW_USER",
                "JOB_APPLICATION",
                "SYSTEM"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },

        referenceId: {
            type: Schema.Types.ObjectId,
            default: null
        },

        referenceModel: {
            type: String,
            enum: [
                "Project",
                "Job",
                "Comment",
                "User",
                "System"
            ],
            default: "System"
        },

        isRead: {
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

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);