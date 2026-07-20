const express = require("express");

const {
    getAllJobsAdminController,
    getJobByIdAdminController,
    updateJobStatusController,
    toggleFeaturedJobAdminController,
    deleteJobAdminController,
    restoreJobAdminController
} = require("../../controllers/admin/job.controller");

const {
    protect
} = require("../../middleware/auth.middleware");

const {
    authorize
} = require("../../middleware/role.middleware");

const ROLES = require("../../constants/roles");

const router = express.Router();

router.use(
    protect,
    authorize(ROLES.ADMIN)
);

/**
 * Job Management
 */

router.get(
    "/",
    getAllJobsAdminController
);

router.get(
    "/:id",
    getJobByIdAdminController
);

router.patch(
    "/:id/status",
    updateJobStatusController
);

router.patch(
    "/:id/featured",
    toggleFeaturedJobAdminController
);

router.delete(
    "/:id",
    deleteJobAdminController
);

router.patch(
    "/:id/restore",
    restoreJobAdminController
);

module.exports = router;