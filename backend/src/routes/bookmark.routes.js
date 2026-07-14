const express = require("express");

const {
    protect
} = require("../middleware/auth.middleware");

const {
    toggleBookmarkController,
    getBookmarksController
} = require("../controllers/bookmark.controller");

const router = express.Router();

/**
 * Bookmark Routes
 */

// Toggle Bookmark
router.post(
    "/:projectId",
    protect,
    toggleBookmarkController
);

// Get My Bookmarks
router.get(
    "/",
    protect,
    getBookmarksController
);

module.exports = router;