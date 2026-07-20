/**
 * Notification
 */
const NOTIFICATION_TYPE = Object.freeze({
    LIKE_PROJECT: "LIKE_PROJECT",
    COMMENT_PROJECT: "COMMENT_PROJECT",
    FOLLOW_USER: "FOLLOW_USER",
    JOB_APPLICATION: "JOB_APPLICATION",
    SYSTEM: "SYSTEM"
});

const REFERENCE_MODEL = Object.freeze({
    PROJECT: "Project",
    JOB: "Job",
    COMMENT: "Comment",
    USER: "User",
    SYSTEM: "System"
});

/**
 * Message
 */
const MESSAGE_TYPE = Object.freeze({
    TEXT: "TEXT",
    IMAGE: "IMAGE",
    FILE: "FILE",
    VOICE: "VOICE",
    SYSTEM: "SYSTEM"
});

const ATTACH_TYPE = Object.freeze({
    NONE: "NONE",
    IMAGE: "IMAGE",
    FILE: "FILE",
    VOICE: "VOICE"
});

/**
 * Job
 */
const WORK_MODE = Object.freeze({
    REMOTE: "Remote",
    HYBRID: "Hybrid",
    ONSITE: "Onsite"
});

const EMPLOYMENT_TYPE = Object.freeze({
    FULL_TIME: "Full-Time",
    PART_TIME: "Part-Time",
    INTERNSHIP: "Internship",
    CONTRACT: "Contract",
    FREELANCE: "Freelance"
});

const EXPERIENCE_LEVEL = Object.freeze({
    FRESHER: "Fresher",
    JUNIOR: "Junior",
    MID_LEVEL: "Mid-Level",
    SENIOR: "Senior",
    LEAD: "Lead"
});

const DEFAULT_CURRENCY = "INR";

/**
 * Skill
 */
const SKILL_CATEGORY = Object.freeze({
    PROGRAMMING: "Programming",
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    DATABASE: "Database",
    CLOUD: "Cloud",
    DEVOPS: "DevOps",
    AI: "AI",
    ML: "ML",
    DATA_SCIENCE: "Data Science",
    MOBILE: "Mobile",
    TESTING: "Testing",
    CYBER_SECURITY: "Cyber Security",
    OTHER: "Other",
    NONE: "none"
});

/**
 * Course
 */
const COURSE_LEVEL = Object.freeze({
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
    EXPERT: "Expert"
});

module.exports = {
    NOTIFICATION_TYPE,
    REFERENCE_MODEL,
    MESSAGE_TYPE,
    ATTACH_TYPE,
    WORK_MODE,
    EMPLOYMENT_TYPE,
    EXPERIENCE_LEVEL,
    COURSE_LEVEL,
    DEFAULT_CURRENCY,
    SKILL_CATEGORY
};