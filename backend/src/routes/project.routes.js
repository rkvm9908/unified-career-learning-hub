const express = require("express");

const {
    createNewProject,
    getMyProjectsController,
    getProjectByIdController,
    updateProjectController,
    deleteProjectController,
    getAllProjectsController,
    uploadProjectImageController,
    toggleFeaturedProjectController,
    getFeaturedProjectsController,
    toggleLikeProjectController,
    toggleBookmarkController,
    getBookmarksController
} = require("../controllers/project.controller");
const {
    protect,
    optionalAuth
} = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createProjectSchema,
    updateProjectSchema
} = require("../validators/project.validator");
const {
    authorize
} = require("../middleware/role.middleware");

const ROLES = require("../constants/roles");
const router = express.Router();

/**
 * Project Routes
 */

// Create Project
router.post(
    "/",
    protect,
    validate(createProjectSchema),
    createNewProject
);

router.get(
    "/featured",
    optionalAuth,
    getFeaturedProjectsController
);
// Get My Projects
router.get(
    "/me",
    protect,
    getMyProjectsController
);

// Get Project By ID
router.get(
    "/:id",
    getProjectByIdController
);

router.patch(
    "/:id",
    protect,
    validate(updateProjectSchema),
    updateProjectController
);

router.get(
    "/",
    optionalAuth,
    getAllProjectsController
);

/**
 * Upload Project Image
 */
router.patch(
    "/:id/image",
    protect,
    upload.single("image"),
    uploadProjectImageController
);

router.patch(
    "/:id/feature",
    protect,
    authorize(ROLES.ADMIN),
    toggleFeaturedProjectController
);

router.post(
    "/:id/like",
    protect,
    toggleLikeProjectController
);

router.delete(
    "/:id",
    protect,
    deleteProjectController
);

/**
 * Bookmark Routes
 */

// Toggle Bookmark
router.post(
    "/bookmarks/:projectId",
    protect,
    toggleBookmarkController
);

// Get My Bookmarks
router.get(
    "/bookmarks",
    protect,
    getBookmarksController
);


module.exports = router;