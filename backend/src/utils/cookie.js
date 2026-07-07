/**
 * Cookie Options
 */
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
};

/**
 * Set Authentication Cookies
 */
const setAuthCookies = (
    res,
    accessToken,
    refreshToken
) => {
    res.cookie(
        "accessToken",
        accessToken,
        {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000 // 15 minutes
        }
    );

    res.cookie(
        "refreshToken",
        refreshToken,
        {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }
    );
};

/**
 * Clear Authentication Cookies
 */
const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", cookieOptions);

    res.clearCookie("refreshToken", cookieOptions);
};

module.exports = {
    setAuthCookies,
    clearAuthCookies
};