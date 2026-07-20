const mongoose = require("mongoose");
const { SKILL_CATEGORY } = require("../constants/enums");
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
            enum: Object.values(SKILL_CATEGORY),
            default: SKILL_CATEGORY.NONE
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
        jobCount:{
            type:Number,
            default:0
        },

        courseCount:{
            type:Number,
            default:0
        },

        userCount:{
            type:Number,
            default:0
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


module.exports = mongoose.models.Skill || mongoose.model(
    "Skill",
    skillSchema
);