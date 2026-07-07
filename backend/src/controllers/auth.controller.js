const {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
} = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { setAuthCookies, clearAuthCookies } = require("../utils/cookie");

/**
 * Register Controller
 */
const register = asyncHandler(async (req, res) => {

    const user = await registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.USER_REGISTERED,
            user
        )
    );
});

/**
 * Login Controller
 */
const login = asyncHandler(async (req, res) => {
    const {
        user,
        accessToken,
        refreshToken
    } = await loginUser(req.body);

    // Set Authentication Cookies
    setAuthCookies(
        res,
        accessToken,
        refreshToken
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.LOGIN_SUCCESS,
            user
        )
    );
});

/**
 * Refresh Token Controller
 */
const refresh = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    const {
        user,
        accessToken,
        refreshToken: newRefreshToken
    } = await refreshAccessToken(refreshToken);

    // Update Cookies
    setAuthCookies(
        res,
        accessToken,
        newRefreshToken
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.TOKEN_REFRESHED,
            user
        )
    );
});

/**
 * Logout Controller
 */
const logout = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    await logoutUser(refreshToken);

    // Clear Authentication Cookies
    clearAuthCookies(res);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.LOGOUT_SUCCESS
        )
    );
});

module.exports = {
    register,
    login,
    refresh,
    logout
};