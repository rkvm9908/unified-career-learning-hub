const { z } = require("zod");

/**
 * Create Project Validation
 */
const createProjectSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3)
        .max(100),

    description: z
        .string()
        .trim()
        .min(20)
        .max(3000),

    technologies: z
        .array(z.string().trim())
        .default([]),

    githubUrl: z
        .string()
        .url()
        .or(z.literal(""))
        .default(""),

    liveUrl: z
        .string()
        .url()
        .or(z.literal(""))
        .default("")
});

/**
 * Update Project Validation
 */
const updateProjectSchema = createProjectSchema.partial();

module.exports = {
    createProjectSchema,
    updateProjectSchema
};