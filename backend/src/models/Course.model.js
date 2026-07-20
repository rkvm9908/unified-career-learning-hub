const mongoose = require("mongoose");

const { Schema } = mongoose;

const { COURSE_LEVEL } = require("../constants/enums");
const { COURSE_STATUS } = require("../constants/status");
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
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        provider: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        category:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            unique:true,
            index:true
        },
        thumbnail:{
            url:{
                type:String,
                default:""
            },
            publicId:{
                type:String,
                default:""
            }
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
            enum: Object.values(COURSE_LEVEL),
            default: COURSE_LEVEL.BEGINNER
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
            enum: Object.values(COURSE_STATUS),
            default: COURSE_STATUS.PUBLISHED,
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

module.exports = mongoose.models.Course || 
    mongoose.model(
    "Course",
    courseSchema
);