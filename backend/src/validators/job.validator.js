const { z } = require("zod");
const { WORK_MODE,
        EMPLOYMENT_TYPE,
        EXPERIENCE_LEVEL,
        DEFAULT_CURRENCY
    } = require("../constants/enums");

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
        .enum(WORK_MODE)
        .default(WORK_MODE.ONSITE),

    employmentType: z
        .enum(EMPLOYMENT_TYPE)
        .default(EMPLOYMENT_TYPE.FULL_TIME),

    experienceLevel: z
        .enum(EXPERIENCE_LEVEL)
        .default(EXPERIENCE_LEVEL.FRESHER),

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