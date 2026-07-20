const Connection = require("../models/Connection.model");
const User = require("../models/User.model");

const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    notifyFollow
} = require("../utils/notification.helper");

/**
 * Toggle Follow / Unfollow
 */
const toggleConnection = async (
    followerId,
    followingId
) => {

    if (followerId === followingId) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.CANNOT_FOLLOW_SELF
        );
    }

    const user = await User.findById(followingId);

    if (!user || !user.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }

    const existingConnection =
        await Connection.findOne({
            follower: followerId,
            following: followingId
        });

    if (existingConnection) {

        existingConnection.isActive =
            !existingConnection.isActive;

        await existingConnection.save();

        if (existingConnection.isActive) {

            await notifyFollow({
                recipientId: followingId,
                senderId: followerId
            });

        }

        return {
            following: existingConnection.isActive
        };
    }

    const connection =
        await Connection.create({
            follower: followerId,
            following: followingId
        });

    await notifyFollow({
        recipientId: followingId,
        senderId: followerId
    });

    return {
        following: true,
        connectionId: connection._id
    };
};

/**
 * Get My Followers
 */
const getFollowers = async (userId) => {

    const followers =
        await Connection.find({
            following: userId,
            isActive: true
        })
            .populate(
                "follower",
                "firstName lastName username profileImage"
            )
            .sort({
                createdAt: -1
            });

    return followers;
};

/**
 * Get My Following
 */
const getFollowing = async (userId) => {

    const following =
        await Connection.find({
            follower: userId,
            isActive: true
        })
            .populate(
                "following",
                "firstName lastName username profileImage"
            )
            .sort({
                createdAt: -1
            });

    return following;
};

/**
 * Get User Followers
 */
const getUserFollowers = async (userId) => {

    return getFollowers(userId);

};

/**
 * Get User Following
 */
const getUserFollowing = async (userId) => {

    return getFollowing(userId);

};

module.exports = {
    toggleConnection,
    getFollowers,
    getFollowing,
    getUserFollowers,
    getUserFollowing
};