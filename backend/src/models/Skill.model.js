const mongoose = require("mongoose");
const SKILL_CATEGORIES = require("../constants/skill.constants");
const { Schema } = mongoose;

const skillSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 100
        },

        category: {
            type: String,
            enum: SKILL_CATEGORIES,
            default: "Other"
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        isVerified: {
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

skillSchema.index({
    name: 1
});

module.exports = mongoose.model(
    "Skill",
    skillSchema
);