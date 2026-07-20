const express = require("express");

const {
    createCourseController,
    getAllCoursesController,
    getCourseByIdController,
    updateCourseController,
    deleteCourseController,
    searchCoursesController
} = require("../controllers/course.controller");

const { protect, authorize } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createCourseSchema,
    updateCourseSchema
} = require("../validators/course.validator");

const ROLES = require("../constants/roles");

const router = express.Router();

/**
 * Public Routes
 */
router.get("/", getAllCoursesController);
router.get("/search", searchCoursesController);
router.get("/:id", getCourseByIdController);

/**
 * Admin Routes
 */
router.post(
    "/",
    protect,
    authorize(ROLES.ADMIN),
    validate(createCourseSchema),
    createCourseController
);

router.patch(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    validate(updateCourseSchema),
    updateCourseController
);

router.delete(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    deleteCourseController
);

module.exports = router;