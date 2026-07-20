const mongoose = require("mongoose");

const { Schema } = mongoose;

const certificationSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        organization: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        credentialId: {
            type: String,
            trim: true,
            default: ""
        },
        credentialUrl: {
            type: String,
            trim: true,
            default: ""
        },
        issueDate: {
            type: Date,
            required: true
        },
        expiryDate: {
            type: Date,
            default: null
        },
        skills: [{
            type: Schema.Types.ObjectId,
            ref: "Skill"
        }],
        description: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: ""
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        verifiedBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            default:null
        },
        verifiedAt:{
            type:Date,
            default:null
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
certificationSchema.index({
    owner:1,
    isVerified:1,
    isActive:1
});
module.exports = mongoose.models.Certification || mongoose.model(
    "Certification",
    certificationSchema
);