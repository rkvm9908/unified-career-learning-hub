const express = require("express");

const {
    protect
} = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
    createCommentSchema,
    updateCommentSchema
} = require("../validators/comment.validator");

const {
    addCommentController,
    getProjectCommentsController,
    updateCommentController,
    deleteCommentController
} = require("../controllers/comment.controller");

const router = express.Router();

/**
 * Add Comment
 */
router.post(
    "/:projectId",
    protect,
    validate(createCommentSchema),
    addCommentController
);

/**
 * Get Project Comments
 */
router.get(
    "/project/:projectId",
    getProjectCommentsController
);

/**
 * Update Comment
 */
router.patch(
    "/:commentId",
    protect,
    validate(updateCommentSchema),
    updateCommentController
);

/**
 * Delete Comment
 */
router.delete(
    "/:commentId",
    protect,
    deleteCommentController
);

module.exports = router;