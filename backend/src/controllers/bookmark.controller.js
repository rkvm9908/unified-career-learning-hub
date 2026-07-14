const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    toggleBookmark,
    getBookmarks
} = require("../services/bookmark.service");

/**
 * Toggle Bookmark
 */
const toggleBookmarkController =
asyncHandler(async (req, res) => {

    const result =
        await toggleBookmark(
            req.user.id,
            req.params.projectId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result.bookmarked
                ? RESPONSE_MESSAGES.BOOKMARK_ADDED
                : RESPONSE_MESSAGES.BOOKMARK_REMOVED,
            result
        )
    );
});

/**
 * Get My Bookmarks
 */
const getBookmarksController =
asyncHandler(async (req, res) => {

    const bookmarks =
        await getBookmarks(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.BOOKMARKS_FETCHED,
            bookmarks
        )
    );
});

module.exports = {
    toggleBookmarkController,
    getBookmarksController
};