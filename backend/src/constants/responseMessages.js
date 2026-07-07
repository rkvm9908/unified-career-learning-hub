const RESPONSE_MESSAGES = Object.freeze({
    // ===========================
    // General
    // ===========================
    SERVER_RUNNING: "Backend is running successfully",

    DATA_FETCHED: "Data fetched successfully",
    DATA_CREATED: "Data created successfully",
    DATA_UPDATED: "Data updated successfully",
    DATA_DELETED: "Data deleted successfully",

    // ===========================
    // Authentication
    // ===========================
    USER_REGISTERED: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    PASSWORD_RESET_SUCCESS: "Password reset successfully",
    EMAIL_VERIFIED: "Email verified successfully",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    USERNAME_ALREADY_EXISTS: "Username already exists",
    ACCOUNT_DISABLED: "Account is disabled",
    ACCOUNT_NOT_VERIFIED: "Please verify your email first",
    PASSWORD_CHANGED: "Password changed successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    TOKEN_REFRESHED: "Token refreshed successfully", 
    
    // ===========================
    // Validation & Errors
    // ===========================
    INVALID_CREDENTIALS: "Invalid email or password",
    INVALID_REQUEST: "Invalid request",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
    USER_NOT_FOUND: "User not found",
    ROUTE_NOT_FOUND: "Route not found",
    VALIDATION_FAILED: "Validation failed",
    
    // ===========================
    // Server
    // ===========================
    INTERNAL_SERVER_ERROR: "Internal server error"
});

module.exports = RESPONSE_MESSAGES;