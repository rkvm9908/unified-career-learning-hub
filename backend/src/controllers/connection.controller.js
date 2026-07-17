const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    toggleConnection,
    getFollowers,
    getFollowing,
    getUserFollowers,
    getUserFollowing
} = require("../services/connection.service");

/**
 * Follow / Unfollow User
 */
const toggleConnectionController =
asyncHandler(async (req, res) => {

    const result =
    await toggleConnection(
        req.user.id,
        req.params.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result.following
                ? RESPONSE_MESSAGES.FOLLOWED_SUCCESSFULLY
                : RESPONSE_MESSAGES.UNFOLLOWED_SUCCESSFULLY,
            result
        )
    );
});

/**
 * Get My Followers
 */
const getFollowersController =
asyncHandler(async (req, res) => {

    const followers =
        await getFollowers(
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.FOLLOWERS_FETCHED,
            followers
        )
    );
});

/**
 * Get My Following
 */
const getFollowingController =
asyncHandler(async (req, res) => {

    const following =
        await getFollowing(
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.FOLLOWING_FETCHED,
            following
        )
    );
});

/**
 * Get User Followers
 */
const getUserFollowersController =
asyncHandler(async (req, res) => {

    const followers =
        await getUserFollowers(
            req.params.userId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.FOLLOWERS_FETCHED,
            followers
        )
    );
});

/**
 * Get User Following
 */
const getUserFollowingController =
asyncHandler(async (req, res) => {

    const following =
        await getUserFollowing(
            req.params.userId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.FOLLOWING_FETCHED,
            following
        )
    );
});

module.exports = {
    toggleConnectionController,
    getFollowersController,
    getFollowingController,
    getUserFollowersController,
    getUserFollowingController
};