const express = require("express");

const {
    register,
    login,
    refresh,
    logout
} = require("../controllers/auth.controller");

const validate = require("../middleware/validate.middleware");

const {
    registerSchema,
    loginSchema
} = require("../validators/auth.validator");

const router = express.Router();

/**
 * Authentication Routes
 */

// Register
router.post(
    "/register",
    validate(registerSchema),
    register
);

// Login
router.post(
    "/login",
    validate(loginSchema),
    login
);

/**
 * Refresh Access Token
 */
router.post(
    "/refresh",
    refresh
);

/**
 * Logout User
 */
router.post(
    "/logout",
    logout
);
module.exports = router;