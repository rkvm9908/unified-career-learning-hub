const express = require("express");

const {

    applyJobController,
    getMyApplicationsController,
    getApplicationByIdController,
    getApplicationsByJobController,
    updateApplicationStatusController,
    updateApplicationController,
    withdrawApplicationController,
    deleteApplicationController

} = require("../controllers/application.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const validate =
    require("../middleware/validate.middleware");

const {

    applyJobSchema,

    updateApplicationSchema,

    updateApplicationStatusSchema

} = require("../validators/application.validator");

const router = express.Router();

/**
 * Applicant Routes
 */

// Apply Job
router.post(
    "/",
    protect,
    validate(applyJobSchema),
    applyJobController
);

// My Applications
router.get(
    "/my",
    protect,
    getMyApplicationsController
);

// Application Details
router.get(
    "/:id",
    protect,
    getApplicationByIdController
);

// Update Cover Letter
router.patch(
    "/:id",
    protect,
    validate(updateApplicationSchema),
    updateApplicationController
);

// Withdraw Application
router.patch(
    "/:id/withdraw",
    protect,
    withdrawApplicationController
);

// Delete Application
router.delete(
    "/:id",
    protect,
    deleteApplicationController
);

/**
 * Recruiter Routes
 */

// Applications By Job
router.get(
    "/job/:jobId",
    protect,
    getApplicationsByJobController
);

// Update Status111
8
router.patch(
    "/:id/status",
    protect,
    validate(updateApplicationStatusSchema),
    updateApplicationStatusController
);

module.exports = router;