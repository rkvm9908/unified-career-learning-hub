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
    ACCOUNT_DELETED: "Account deleted successfully.",
    ACCOUNT_NOT_VERIFIED: "Please verify your email first",
    ACCOUNT_DEACTIVATED: "Account is deactivated. Please contact support for assistance.",
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
    INTERNAL_SERVER_ERROR: "Internal server error",

    // ===========================
    // Project
    // ===========================

    PROJECT_CREATED: "Project created successfully.",
    PROJECTS_FETCHED: "Projects fetched successfully.",
    PROJECT_FETCHED: "Project fetched successfully.",
    PROJECT_NOT_FOUND: "Project not found.",
    PROJECT_UPDATED: "Project updated successfully.",
    PROJECT_DELETED: "Project deleted successfully.",
    PROJECT_IMAGE_UPDATED: "Project image updated successfully.",
    PROJECT_FEATURE_UPDATED: "Project feature status updated successfully.",
    FEATURED_PROJECTS_FETCHED: "Featured projects fetched successfully.",

    // ===========================
    // Image
    // ===========================
    IMAGE_REQUIRED: "Please upload an image.",
    IMAGE_UPLOADED: "Image uploaded successfully.",

    // ===========================
    // Bookmarks
    // ===========================
    BOOKMARK_ADDED: "Project bookmarked successfully.",
    BOOKMARK_REMOVED: "Project removed from bookmarks successfully.",
    BOOKMARKS_FETCHED: "Bookmarked projects fetched successfully.",

    // ===========================
    // Comments
    // ===========================
    COMMENT_ADDED: "Comment added successfully.",
    COMMENTS_FETCHED: "Comments fetched successfully.",
    COMMENT_UPDATED: "Comment updated successfully.",
    COMMENT_DELETED: "Comment deleted successfully.",
    COMMENT_NOT_FOUND: "Comment not found.",
});

module.exports = RESPONSE_MESSAGES;