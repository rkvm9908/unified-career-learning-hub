const { z } = require("zod");

/**
 * Mark Notification As Read
 */
const markAsReadSchema = z.object({

    isRead: z
        .boolean()
        .default(true)

});

/**
 * Update Notification
 */
const updateNotificationSchema =
    markAsReadSchema.partial();

module.exports = {
    markAsReadSchema,
    updateNotificationSchema
};