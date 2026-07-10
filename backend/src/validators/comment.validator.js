const { z } = require("zod");

const createCommentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1)
        .max(500)
});

const updateCommentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1)
        .max(500)
});

module.exports = {
    createCommentSchema,
    updateCommentSchema
};