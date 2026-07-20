/**
 * Map Application Response
 */
const mapApplication = (application) => {
    if (!application) {
        return null;
    }

    return {
        id: application._id,
        job: application.job
            ? {
                id: application.job._id,
                title: application.job.title,
                company: application.job.company,
                companyLogo: application.job.companyLogo
            }
            : null,
        applicant: application.applicant
            ? {
                id: application.applicant._id,
                firstName: application.applicant.firstName,
                lastName: application.applicant.lastName,
                username: application.applicant.username,
                email: application.applicant.email,
                profileImage: application.applicant.profileImage
            }
            : null,
        resume: application.resume,
        coverLetter: application.coverLetter,
        status: application.status,
        notes: application.notes,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt
    };
};

module.exports = {
    mapApplication
};