const { z } = require("zod");

/**
 * Apply Job Validation
 */
const applyJobSchema = z.object({

    jobId: z
        .string()
        .trim()
        .min(24)
        .max(24),

    resumeId: z
        .string()
        .trim()
        .min(24)
        .max(24),

    coverLetter: z
        .string()
        .trim()
        .max(3000)
        .optional()
        .default("")

});

/**
 * Update Application Status
 */
const updateApplicationStatusSchema = z.object({

    status: z.enum([
        "Pending",
        "Reviewed",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
        "Withdrawn"
    ]),

    notes: z
        .string()
        .trim()
        .max(5000)
        .optional(),

    interviewDate: z
        .string()
        .datetime()
        .optional()

});

/**
 * Update Cover Letter
 */
const updateApplicationSchema = z.object({

    coverLetter: z
        .string()
        .trim()
        .max(3000)

});

module.exports = {

    applyJobSchema,
    updateApplicationStatusSchema,
    updateApplicationSchema

};