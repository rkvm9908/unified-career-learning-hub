// APPLICATION MODEL
const APPLICATION_STATUS = [
                "Pending",
                "Reviewed",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected",
                "Withdrawn"
            ];

// NOTIFICATION_MODEL

const NOTIFICATION_TYPE = [
                "LIKE_PROJECT",
                "COMMENT_PROJECT",
                "FOLLOW_USER",
                "JOB_APPLICATION",
                "SYSTEM"
            ];

const REFERENCE_MODEL = [
                "Project",
                "Job",
                "Comment",
                "User",
                "System"
            ];

//Message model 

const ATTACH_TYPES = [
            "NONE",
            "IMAGE",
            "FILE",
            "VOICE"
        ];
const MESSAGE_TYPE = [
                "TEXT",
                "IMAGE",
                "FILE",
                "VOICE",
                "SYSTEM"
            ];

// Export
module.exports = { 
    APPLICATION_STATUS,
    NOTIFICATION_TYPE,
    REFERENCE_MODEL,
    MESSAGE_TYPE,
    ATTACH_TYPES,
};
