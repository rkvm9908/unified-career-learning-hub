const { z } = require("zod");

const {
    SKILL_CATEGORIES
} = require("../constants/enums");

/**
 * Create Skill Validation
 */
const createSkillSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2)
        .max(100),

    category: z
        .enum(SKILL_CATEGORIES)
        .default("Other"),

    description: z
        .string()
        .trim()
        .max(1000)
        .optional()
        .default("")

});

/**
 * Update Skill Validation
 */
const updateSkillSchema =
    createSkillSchema.partial();

module.exports = {

    createSkillSchema,

    updateSkillSchema

};