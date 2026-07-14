const { z } = require("zod");
const { WORK_MODES,
        EMPLOYMENT_TYPES,
        EXPERIENCE_LEVELS,
        DEFAULT_CURRENCY
    } = require("../constants/job.constants");
/**
 * Create Job Validation
 */
const createJobSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3)
        .max(100),

    company: z
        .string()
        .trim()
        .min(2)
        .max(100),

    location: z
        .string()
        .trim()
        .min(2)
        .max(100),

    workMode: z
        .enum(WORK_MODES)
        .default("Onsite"),

    employmentType: z
        .enum(EMPLOYMENT_TYPES)
        .default("Full-Time"),

    experienceLevel: z
        .enum(EXPERIENCE_LEVELS)
        .default("Fresher"),

    salary: z.coerce
        .number()
        .nonnegative()
        .default(0),

    currency: z
        .string()
        .default(DEFAULT_CURRENCY),

    skills: z
        .array(z.string().trim())
        .default([]),

    description: z
        .string()
        .trim()
        .min(20)
        .max(5000),

    responsibilities: z
        .array(z.string().trim())
        .default([]),

    qualifications: z
        .array(z.string().trim())
        .default([]),

    benefits: z
        .array(z.string().trim())
        .default([]),

    applicationDeadline: z
        .coerce
        .date()
        .optional(),

    vacancies: z.coerce
        .number()
        .int()
        .positive()
        .default(1)
});

/**
 * Update Job Validation
 */
const updateJobSchema =
    createJobSchema.partial();

module.exports = {
    createJobSchema,
    updateJobSchema
};