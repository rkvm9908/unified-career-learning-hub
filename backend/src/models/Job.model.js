const mongoose = require("mongoose");

const { Schema } = mongoose;

const {
    WORK_MODES,
    EMPLOYMENT_TYPES,
    EXPERIENCE_LEVELS,
    JOB_STATUS,
    DEFAULT_CURRENCY
} = require("../constants/job.constants");

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        company: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        companyLogo: {
            url: {
                type: String,
                default: ""
            },
            publicId: {
                type: String,
                default: ""
            }
        },

        location: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        workMode: {
            type: String,
            enum: WORK_MODES,
            default: "Onsite"
        },

        employmentType: {
            type: String,
            enum: EMPLOYMENT_TYPES,
            default: "Full-Time"
        },

        experienceLevel: {
            type: String,
            enum: EXPERIENCE_LEVELS,
            default: "Fresher"
        },

        salary: {
            type: Number,
            min: 0,
            default: 0
        },

        currency: {
            type: String,
            default: DEFAULT_CURRENCY
        },

        skills: [
            {
                type: String,
                trim: true
            }
        ],

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },

        responsibilities: [
            {
                type: String,
                trim: true
            }
        ],

        qualifications: [
            {
                type: String,
                trim: true
            }
        ],

        benefits: [
            {
                type: String,
                trim: true
            }
        ],

        applicationDeadline: {
            type: Date
        },

        vacancies: {
            type: Number,
            min: 1,
            default: 1
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        applicantsCount: {
            type: Number,
            default: 0
        },

        viewsCount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: JOB_STATUS,
            default: "Open"
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

/**
 * Indexes
 */
jobSchema.index({
    title: "text",
    description: "text",
    company: "text"
});

jobSchema.index({
    skills: 1
});

jobSchema.index({
    location: 1
});

module.exports = mongoose.model(
    "Job",
    jobSchema
);