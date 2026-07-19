const { z } = require("zod");

/**
 * Create Certification
 */
const createCertificationSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2)
        .max(200),

    organization: z
        .string()
        .trim()
        .min(2)
        .max(200),

    credentialId: z
        .string()
        .trim()
        .max(100)
        .optional()
        .default(""),

    credentialUrl: z
        .string()
        .trim()
        .url()
        .optional()
        .or(z.literal("")),

    issueDate: z
        .string()
        .datetime(),

    expiryDate: z
        .string()
        .datetime()
        .nullable()
        .optional(),

    skills: z
        .array(z.string().trim().length(24))
        .optional()
        .default([]),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional()
        .default("")
});

/**
 * Update Certification
 */
const updateCertificationSchema =
    createCertificationSchema.partial();

module.exports = {
    createCertificationSchema,
    updateCertificationSchema
};