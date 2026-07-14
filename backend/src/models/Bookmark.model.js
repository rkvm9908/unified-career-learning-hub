const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookmarkSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

bookmarkSchema.index(
    {
        user: 1,
        project: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "Bookmark",
    bookmarkSchema
);