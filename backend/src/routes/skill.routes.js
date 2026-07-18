const express = require("express");

const {
    createSkillController,
    getAllSkillsController,
    getSkillByIdController,
    updateSkillController,
    deleteSkillController,
    searchSkillsController
} = require("../controllers/skill.controller");

const { protect, authorize } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createSkillSchema,
    updateSkillSchema
} = require("../validators/skill.validator");

const { USER_ROLES } = require("../constants/enums");

const router = express.Router();

/**
 * Public Routes
 */
router.get("/", getAllSkillsController);
router.get("/search", searchSkillsController);
router.get("/:id", getSkillByIdController);

/**
 * Admin Routes
 */
router.post(
    "/",
    protect,
    authorize(USER_ROLES.ADMIN),
    validate(createSkillSchema),
    createSkillController
);

router.patch(
    "/:id",
    protect,
    authorize(USER_ROLES.ADMIN),
    validate(updateSkillSchema),
    updateSkillController
);

router.delete(
    "/:id",
    protect,
    authorize(USER_ROLES.ADMIN),
    deleteSkillController
);

module.exports = router;