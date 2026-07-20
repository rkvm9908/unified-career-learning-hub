const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500
        },

        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isEdited: {
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

module.exports = mongoose.models.Comment ||mongoose.model(
    "Comment",
    commentSchema
);