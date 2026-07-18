const { z } = require("zod");

const {
    MESSAGE_TYPES,
    ATTACH_TYPES,
} = require("../constants/enums");

/**
 * Send Message
 */
const sendMessageSchema = z.object({

    content: z
    .string()
    .trim()
    .max(5000)
    .optional()
    .default(""),

    attachmentType: z
        .enum(ATTACH_TYPES)
        .optional()
        .default("NONE"),

    messageType: z
        .enum(MESSAGE_TYPES)
        .default("TEXT"),

    replyTo: z
        .string()
        .trim()
        .length(24)
        .optional()

}).superRefine((data, ctx) => {

    if (
    data.messageType === "TEXT" &&
    data.attachmentType === "NONE" &&
    (!data.content || !data.content.trim())
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["content"],
            message: "Message content is required."
        });
    }

});

/**
 * Update Message
 */
const updateMessageSchema = z.object({

    content: z
        .string()
        .trim()
        .min(1)
        .max(5000)

});

module.exports = {
    sendMessageSchema,
    updateMessageSchema
};