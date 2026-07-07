const { z } = require("zod");

/**
 * Register Validation
 */
const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters"),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Last name cannot exceed 50 characters"),

    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters"),

    email: z
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
});

/**
 * Login Validation
 */
const loginSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

/**
 * Forgot Password Validation
 */
const forgotPasswordSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase()
});

/**
 * Reset Password Validation
 */
const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z
            .string()
            .min(8, "Confirm Password must be at least 8 characters")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

/**
 * Change Password Validation
 */
const changePasswordSchema = z
    .object({
        currentPassword: z.string(),

        newPassword: z
            .string()
            .min(8, "New password must be at least 8 characters"),

        confirmPassword: z.string()
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

/**
 * Update Profile Validation
 */
const updateProfileSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2)
        .max(50)
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .optional(),

    phoneNumber: z
        .string()
        .trim()
        .optional(),

    bio: z
        .string()
        .max(500)
        .optional(),

    profileImage: z
        .string()
        .url("Invalid profile image URL")
        .optional(),

    skills: z
        .array(z.string())
        .optional(),

    education: z
        .object({
            degree: z.string().optional(),
            department: z.string().optional(),
            institution: z.string().optional(),
            graduationYear: z.number().optional()
        })
        .optional(),

    socialLinks: z
        .object({
            github: z.string().url().optional(),
            linkedin: z.string().url().optional(),
            portfolio: z.string().url().optional()
        })
        .optional()
});

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema,
    updateProfileSchema
};