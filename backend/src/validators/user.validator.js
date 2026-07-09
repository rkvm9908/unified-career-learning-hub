const { z } = require("zod");

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
        .trim()
        .max(500)
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
            github: z.string().url().optional().or(z.literal("")),
            linkedin: z.string().url().optional().or(z.literal("")),
            portfolio: z.string().url().optional().or(z.literal(""))
        })
        .optional()
});

const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, "Current password is required"),

    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .max(100)
}); 
module.exports = {
    updateProfileSchema,
    changePasswordSchema
};