const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 3000
        },

        technologies: [{
            type: String,
            trim: true
        }],

        githubUrl: {
            type: String,
            default: ""
        },

        liveUrl: {
            type: String,
            default: ""
        },

        image: {
            url: {
                type: String,
                default: ""
            },
            publicId: {
                type: String,
                default: ""
            }
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        likesCount: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        },
        isFeatured: {
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

module.exports = mongoose.models.Project || mongoose.model(
    "Project",
    projectSchema
);