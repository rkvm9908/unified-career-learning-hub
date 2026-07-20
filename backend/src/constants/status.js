const RECRUITER_STATUS = Object.freeze({
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    SUSPENDED: "Suspended"
});

const USER_STATUS = Object.freeze({
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    BLOCKED: "Blocked"
});

const JOB_STATUS = Object.freeze({
    DRAFT: "Draft",
    OPEN: "Open",
    CLOSED: "Closed",
    EXPIRED: "Expired"
});

const APPLICATION_STATUS = Object.freeze({
    APPLIED: "Applied",
    REVIEWING: "Reviewing",
    SHORTLISTED: "Shortlisted",
    INTERVIEW: "Interview",
    OFFERED: "Offered",
    HIRED: "Hired",
    REJECTED: "Rejected",
    WITHDRAWN: "Withdrawn"
});

const COURSE_STATUS = Object.freeze({
    DRAFT: "Draft",
    PUBLISHED: "Published",
    ARCHIVED: "Archived"
});

const SKILL_STATUS = Object.freeze({
    ACTIVE: "Active",
    INACTIVE: "Inactive"
});

const CERTIFICATION_STATUS = Object.freeze({
    ACTIVE: "Active",
    INACTIVE: "Inactive"
});

const PROJECT_STATUS = Object.freeze({
    PUBLIC: "Public",
    PRIVATE: "Private"
});

const NOTIFICATION_STATUS = Object.freeze({
    UNREAD: "Unread",
    READ: "Read"
});

const MESSAGE_STATUS = Object.freeze({
    SENT: "Sent",
    DELIVERED: "Delivered",
    READ: "Read"
});

module.exports = {
    RECRUITER_STATUS,
    USER_STATUS,
    JOB_STATUS,
    APPLICATION_STATUS,
    COURSE_STATUS,
    SKILL_STATUS,
    CERTIFICATION_STATUS,
    PROJECT_STATUS,
    NOTIFICATION_STATUS,
    MESSAGE_STATUS
};