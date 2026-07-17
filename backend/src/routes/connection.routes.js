const express = require("express");

const {
    toggleConnectionController,
    getFollowersController,
    getFollowingController,
    getUserFollowersController,
    getUserFollowingController
} = require("../controllers/connection.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * Connection Routes
 */

// Follow / Unfollow User
router.post(
    "/:userId/follow",
    protect,
    toggleConnectionController
);

// Get My Followers
router.get(
    "/followers",
    protect,
    getFollowersController
);

// Get My Following
router.get(
    "/following",
    protect,
    getFollowingController
);

// Get User Followers
router.get(
    "/:userId/followers",
    getUserFollowersController
);

// Get User Following
router.get(
    "/:userId/following",
    getUserFollowingController
);

module.exports = router;