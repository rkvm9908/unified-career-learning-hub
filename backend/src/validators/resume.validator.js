const { z } = require("zod");

/**
 * Create Resume Validation
 */
const createResumeSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters.")
        .max(100, "Title cannot exceed 100 characters."),

    professionalSummary: z
        .string()
        .trim()
        .max(1000, "Professional summary cannot exceed 1000 characters.")
        .optional(),

    visibility: z
        .enum(["public", "private"])
        .optional()
});

/**
 * Update Resume Validation
 */
const updateResumeSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3)
        .max(100)
        .optional(),

    professionalSummary: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    visibility: z
        .enum(["public", "private"])
        .optional()
});

module.exports = {
    createResumeSchema,
    updateResumeSchema
};