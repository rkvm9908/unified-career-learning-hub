const mongoose = require("mongoose");
const APPLICATION_STATUS = require("../constants/status");
const { Schema } = mongoose;

const applicationSchema = new Schema(
    {

        applicant: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        recruiter: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
            index: true
        },

        resume: {
            type: Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        coverLetter: {
            type: String,
            trim: true,
            maxlength: 3000,
            default: ""
        },

        status: {
            type: String,
            enum: Object.values(APPLICATION_STATUS),
            default: APPLICATION_STATUS.APPLIED
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 5000,
            default: ""
        },

        interviewDate: {
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
 * Prevent Duplicate Application
 */
applicationSchema.index(
    {
        applicant: 1,
        job: 1
    },
    {
        unique: true
    }
);

module.exports = 
    mongoose.models.Application ||
    mongoose.model(
    "Application",
    applicationSchema
);