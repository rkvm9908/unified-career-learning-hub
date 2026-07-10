const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    addComment,
    getProjectComments,
    updateComment,
    deleteComment
} = require("../services/comment.service");

/**
 * Add Comment
 */
const addCommentController =
asyncHandler(async (req, res) => {

    const comment =
        await addComment(
            req.params.projectId,
            req.user.id,
            req.body.content
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.COMMENT_ADDED,
            comment
        )
    );
});

/**
 * Get Project Comments
 */
const getProjectCommentsController =
asyncHandler(async (req, res) => {

    const result =
        await getProjectComments(
            req.params.projectId,
            req.query
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COMMENTS_FETCHED,
            result
        )
    );
});

/**
 * Update Comment
 */
const updateCommentController =
asyncHandler(async (req, res) => {

    const comment =
        await updateComment(
            req.params.commentId,
            req.user.id,
            req.body.content
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COMMENT_UPDATED,
            comment
        )
    );
});

/**
 * Delete Comment
 */
const deleteCommentController =
asyncHandler(async (req, res) => {

    await deleteComment(
        req.params.commentId,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COMMENT_DELETED
        )
    );
});

module.exports = {
    addCommentController,
    getProjectCommentsController,
    updateCommentController,
    deleteCommentController
};