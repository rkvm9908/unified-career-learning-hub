const mongoose = require("mongoose");

const { Schema } = mongoose;

const resumeSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        professionalSummary: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: ""
        },

        resumeFile: {
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
                }
        },

        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public"
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
    "Resume",
    resumeSchema
);