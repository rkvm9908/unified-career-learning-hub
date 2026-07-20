const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionSchema = new Schema(
    {
        follower: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        following: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
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

// Prevent duplicate follows
connectionSchema.index(
    {
        follower: 1,
        following: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.models.Connection || mongoose.model(
    "Connection",
    connectionSchema
);