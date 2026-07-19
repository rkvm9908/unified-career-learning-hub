const mongoose = require("mongoose");

const { Schema } = mongoose;

const {
    COURSE_LEVELS,
    COURSE_STATUS
} = require("../constants/enums");

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        instructor: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        provider: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        thumbnail: {
            type: String,
            default: ""
        },
        courseUrl: {
            type: String,
            required: true,
            trim: true
        },
        skills: [{
            type: Schema.Types.ObjectId,
            ref: "Skill"
        }],
        level: {
            type: String,
            enum: COURSE_LEVELS,
            default: "Beginner"
        },
        duration: {
            type: Number,
            default: 0
        },
        language: {
            type: String,
            default: "English"
        },
        status: {
            type: String,
            enum: COURSE_STATUS,
            default: "Published"
        },
        isFree: {
            type: Boolean,
            default: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        totalEnrollments: {
            type: Number,
            default: 0
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

courseSchema.index({
    title: "text",
    description: "text",
    instructor: "text",
    provider: "text"
});

module.exports = mongoose.model(
    "Course",
    courseSchema
);