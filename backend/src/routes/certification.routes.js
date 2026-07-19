const express = require("express");

const {
    createCertificationController,
    getMyCertificationsController,
    getCertificationByIdController,
    updateCertificationController,
    deleteCertificationController
} = require("../controllers/certification.controller");

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createCertificationSchema,
    updateCertificationSchema
} = require("../validators/certification.validator");

const router = express.Router();

/**
 * Create Certification
 */
router.post(
    "/",
    protect,
    validate(createCertificationSchema),
    createCertificationController
);

/**
 * Get My Certifications
 */
router.get(
    "/my",
    protect,
    getMyCertificationsController
);

/**
 * Get Certification By ID
 */
router.get(
    "/:id",
    protect,
    getCertificationByIdController
);

/**
 * Update Certification
 */
router.patch(
    "/:id",
    protect,
    validate(updateCertificationSchema),
    updateCertificationController
);

/**
 * Delete Certification
 */
router.delete(
    "/:id",
    protect,
    deleteCertificationController
);

module.exports = router;