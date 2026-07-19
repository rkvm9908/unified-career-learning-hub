const { z } = require("zod");

const {
    COURSE_LEVELS,
    COURSE_STATUS
} = require("../constants/enums");

/**
 * Create Course
 */
const createCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3)
        .max(200),

    description: z
        .string()
        .trim()
        .max(5000)
        .optional()
        .default(""),

    instructor: z
        .string()
        .trim()
        .min(2)
        .max(150),

    provider: z
        .string()
        .trim()
        .min(2)
        .max(150),

    thumbnail: z
        .string()
        .trim()
        .url()
        .optional()
        .or(z.literal("")),

    courseUrl: z
        .string()
        .trim()
        .url(),

    skills: z
        .array(
            z.string().trim().length(24)
        )
        .optional()
        .default([]),

    level: z
        .enum(COURSE_LEVELS)
        .default("Beginner"),

    duration: z
        .number()
        .min(0)
        .default(0),

    language: z
        .string()
        .trim()
        .default("English"),

    status: z
        .enum(COURSE_STATUS)
        .default("Published"),

    isFree: z
        .boolean()
        .default(true),

    rating: z
        .number()
        .min(0)
        .max(5)
        .optional(),

    totalEnrollments: z
        .number()
        .min(0)
        .optional()
});

/**
 * Update Course
 */
const updateCourseSchema =
    createCourseSchema.partial();

module.exports = {
    createCourseSchema,
    updateCourseSchema
};