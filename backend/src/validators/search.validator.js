const { z } = require("zod");

const searchSchema = z.object({
    q: z.string().trim().min(1),
    type: z.enum([
        "users",
        "jobs",
        "courses",
        "skills"
    ]).optional()
});

module.exports = {
    searchSchema
};