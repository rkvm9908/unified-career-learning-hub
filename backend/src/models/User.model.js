const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const ROLES = require("../constants/roles");
const {
    generateAccessToken,
    generateRefreshToken
} = require("../utils/jwt");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: 1,
            maxlength: 50
        },

        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: validator.isEmail,
                message: "Please provide a valid email address"
            }
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false
        },

        phoneNumber: {
            type: String,
            trim: true,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        skills: [
            {
                type: String,
                trim: true
            }
        ],

        education: {
            degree: {
                type: String,
                trim: true,
                default: ""
            },
            department: {
                type: String,
                trim: true,
                default: ""
            },
            institution: {
                type: String,
                trim: true,
                default: ""
            },
            graduationYear: {
                type: Number
            }
        },

        socialLinks: {
            github: {
            type: String,
            trim: true,
            default: "",
            validate: {
                validator: (value) =>
                    value === "" || validator.isURL(value),
                message: "Invalid GitHub URL"
            }
        },
            linkedin: {
            type: String,
            trim: true,
            default: "",
            validate: {
                validator: (value) =>
                    value === "" || validator.isURL(value),
                message: "Invalid LinkedIn URL"
            }
            },
            portfolio: {
            type: String,
            trim: true,
            default: "",
            validate: {
                validator: (value) =>
                    value === "" || validator.isURL(value),
                message: "Invalid Portfolio URL"
            }
            }
        },

        refreshToken: {
            type: String,
            default: "",
            select: false
        },

        passwordChangedAt: {
            type: Date
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

userSchema.pre("save", async function () {
    // Normalize email
    if (this.email) {
        this.email = this.email.toLowerCase();
    }

    // Hash password only if modified
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        Number(process.env.BCRYPT_SALT_ROUNDS) || 10
    );
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Generate Access Token
 */
userSchema.methods.generateAccessToken = function () {
    return generateAccessToken({
        id: this._id,
        role: this.role
    });
};

/**
 * Generate Refresh Token
 */
userSchema.methods.generateRefreshToken = function () {
    return generateRefreshToken({
        id: this._id
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;