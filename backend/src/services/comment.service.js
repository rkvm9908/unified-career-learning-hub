const Comment = require("../models/Comment.model");
const Project = require("../models/Project.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Safe Comment Response
 */
const getSafeComment = (comment) => ({
    id: comment._id,
    content: comment.content,

    user: comment.user
        ? {
            id: comment.user._id,
            firstName: comment.user.firstName,
            lastName: comment.user.lastName,
            username: comment.user.username,
            profileImage: comment.user.profileImage
        }
        : null,

    project: comment.project,

    isEdited: comment.isEdited,

    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt
});

/**
 * Add Comment
 */
const addComment = async (
    projectId,
    userId,
    content
) => {

    const project = await Project.findOne({
        _id: projectId,
        isActive: true
    });

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    const comment = await Comment.create({
        content,
        project: projectId,
        user: userId
    });

    project.commentsCount += 1;

    await project.save();

    await comment.populate(
        "user",
        "firstName lastName username profileImage"
    );

    return getSafeComment(comment);
};

/**
 * Get Project Comments
 */
const getProjectComments = async (
    projectId,
    query
) => {

    const {
        page = 1,
        limit = 10
    } = query;

    const project = await Project.findOne({
        _id: projectId,
        isActive: true
    });

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    const skip =
        (Number(page) - 1) * Number(limit);

    const comments = await Comment.find({
        project: projectId,
        isActive: true
    })
    .populate(
        "user",
        "firstName lastName username profileImage"
    )
    .sort({
        createdAt: -1
    })
    .skip(skip)
    .limit(Number(limit));

    const total = await Comment.countDocuments({
        project: projectId,
        isActive: true
    });

    return {
        comments: comments.map(getSafeComment),
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
        }
    };
};

/**
 * Update Comment
 */
const updateComment = async (
    commentId,
    userId,
    content
) => {

    const comment = await Comment.findOne({
        _id: commentId,
        isActive: true
    });

    if (!comment) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COMMENT_NOT_FOUND
        );
    }

    // Check Ownership
    if (comment.user.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    comment.content = content;
    comment.isEdited = true;

    await comment.save();

    await comment.populate(
        "user",
        "firstName lastName username profileImage"
    );

    return getSafeComment(comment);
};

/**
 * Delete Comment
 */
const deleteComment = async (
    commentId,
    userId
) => {

    const comment = await Comment.findOne({
        _id: commentId,
        isActive: true
    });

    if (!comment) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COMMENT_NOT_FOUND
        );
    }

    // Check Ownership
    if (comment.user.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    // Soft Delete
    comment.isActive = false;

    await comment.save();

    // Update Project Comment Count
    await Project.findByIdAndUpdate(
        comment.project,
        {
            $inc: {
                commentsCount: -1
            }
        }
    );

    return;
};

module.exports = {
    addComment,
    getSafeComment,
    getProjectComments,
    updateComment,
    deleteComment
};