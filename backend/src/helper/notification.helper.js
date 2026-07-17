const {
    createNotification
} = require("../services/notification.service");

/**
 * Notify Project Like
 */
const notifyProjectLike = async ({
    recipientId,
    senderId,
    projectId
}) => {

    if (recipientId.toString() === senderId.toString()) {
        return;
    }

    await createNotification({
        recipient: recipientId,
        sender: senderId,
        type: "LIKE_PROJECT",
        title: "Project Liked",
        message: "Someone liked your project.",
        referenceModel: "Project",
        referenceId: projectId
    });
};

/**
 * Notify Project Comment
 */
const notifyProjectComment = async ({
    recipientId,
    senderId,
    projectId
}) => {

    if (recipientId.toString() === senderId.toString()) {
        return;
    }

    await createNotification({
        recipient: recipientId,
        sender: senderId,
        type: "COMMENT_PROJECT",
        title: "New Comment",
        message: "Someone commented on your project.",
        referenceModel: "Project",
        referenceId: projectId
    });
};

/**
 * Notify Follow
 */
const notifyFollow = async ({
    recipientId,
    senderId
}) => {

    if (recipientId.toString() === senderId.toString()) {
        return;
    }

    await createNotification({
        recipient: recipientId,
        sender: senderId,
        type: "FOLLOW_USER",
        title: "New Follower",
        message: "Someone started following you.",
        referenceModel: "User",
        referenceId: senderId
    });
};

/**
 * Notify Job Application
 */
const notifyJobApplication = async ({
    recipientId,
    senderId,
    jobId
}) => {

    if (recipientId.toString() === senderId.toString()) {
        return;
    }

    await createNotification({
        recipient: recipientId,
        sender: senderId,
        type: "JOB_APPLICATION",
        title: "New Job Application",
        message: "Someone applied for your job posting.",
        referenceModel: "Job",
        referenceId: jobId
    });
};

module.exports = {
    notifyProjectLike,
    notifyProjectComment,
    notifyFollow,
    notifyJobApplication
};