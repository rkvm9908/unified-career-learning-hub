// Imports Router
const express = require("express");

const {
    createJobController,
    getMyJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController,
    getAllJobsController,
    getFeaturedJobsController,
    uploadCompanyLogoController,
    toggleFeaturedJobController
} = require("../controllers/job.controller");

const {
    protect,
    optionalAuth
} = require("../middleware/auth.middleware");

const {
    authorize
} = require("../middleware/role.middleware");

const { uploadImage } = require("../middleware/upload.middleware");

const validate = require("../middleware/validate.middleware");

const {
    createJobSchema,
    updateJobSchema
} = require("../validators/job.validator");

const ROLES = require("../constants/roles");

const router = express.Router();

// -----------------------------------------

/**
 * Job Routes
 */

// Create Job
router.post(
    "/",
    protect,
    validate(createJobSchema),
    createJobController
);

// Featured Jobs
router.get(
    "/featured",
    optionalAuth,
    getFeaturedJobsController
);

// My Jobs
router.get(
    "/me",
    protect,
    getMyJobsController
);

// Get All Jobs
router.get(
    "/",
    optionalAuth,
    getAllJobsController
);

// Get Job By ID
router.get(
    "/:id",
    optionalAuth,
    getJobByIdController
);

// Update Job
router.patch(
    "/:id",
    protect,
    validate(updateJobSchema),
    updateJobController
);

// Delete Job
router.delete(
    "/:id",
    protect,
    deleteJobController
);

// Upload Company Logo
router.patch(
    "/:id/logo",
    protect,
    uploadImage.single("logo"),
    uploadCompanyLogoController
);

// Toggle Featured
router.patch(
    "/:id/feature",
    protect,
    authorize(ROLES.ADMIN),
    toggleFeaturedJobController
);

// -----------------------------------------
// Express Router

module.exports = router;