const { z } = require("zod");
const { APPLICATION_STATUS } = require("../constants/enums");
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

    status: z.enum(APPLICATION_STATUS),

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