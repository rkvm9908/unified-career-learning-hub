const Bookmark = require("../models/Bookmark.model");
const Project = require("../models/Project.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Toggle Bookmark
 */
const toggleBookmark = async (
    userId,
    projectId
) => {

    // Check Project
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

    // Already Bookmarked?
    const existingBookmark =
        await Bookmark.findOne({
            user: userId,
            project: projectId
        });

    if (existingBookmark) {

        await Bookmark.findByIdAndDelete(
            existingBookmark._id
        );

        return {
            bookmarked: false
        };
    }

    await Bookmark.create({
        user: userId,
        project: projectId
    });

    return {
        bookmarked: true
    };
};

/**
 * Get My Bookmarks
 */
const getBookmarks = async (userId) => {

    const bookmarks =
        await Bookmark.find({
            user: userId
        })
        .populate({
            path: "project",
            populate: {
                path: "owner",
                select:
                    "firstName lastName username profileImage"
            }
        })
        .sort({
            createdAt: -1
        });

    return bookmarks.map((bookmark) => ({
        id: bookmark._id,
        bookmarkedAt: bookmark.createdAt,
        project: bookmark.project
    }));
};

module.exports = {
    toggleBookmark,
    getBookmarks
};