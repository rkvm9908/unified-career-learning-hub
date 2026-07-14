const express = require("express");
const {
    uploadResume
} = require("../middleware/upload.middleware");
const {
    createResumeController,
    getMyResumeController,
    updateResumeController,
    uploadResumeController,
    deleteResumeController,
    downloadResumeController
} = require("../controllers/resume.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
    createResumeSchema,
    updateResumeSchema
} = require("../validators/resume.validator");

const router = express.Router();

/**
 * Resume Routes
 */

// Create Resume
router.post(
    "/",
    protect,
    validate(createResumeSchema),
    createResumeController
);

// Get My Resume
router.get(
    "/me",
    protect,
    getMyResumeController
);

// Update Resume
router.patch(
    "/:id",
    protect,
    validate(updateResumeSchema),
    updateResumeController
);

/**
 * Upload Resume PDF
 */
router.patch(
    "/:id/upload",
    protect,
    uploadResume.single("resume"),
    uploadResumeController
);

// Delete Resume
router.delete(
    "/:id",
    protect,
    deleteResumeController
);

/**
 * Download Resume
 */
router.get(
    "/:id/download",
    protect,
    downloadResumeController
);

module.exports = router;