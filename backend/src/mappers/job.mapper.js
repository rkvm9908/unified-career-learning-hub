/**
 * Map Job Response
 */
const mapJob = (job) => {
    if (!job) {
        return null;
    }

    const owner = job.owner;

    return {
        id: job._id,
        title: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        location: job.location,
        workMode: job.workMode,
        employmentType: job.employmentType,
        experienceLevel: job.experienceLevel,
        salary: job.salary,
        currency: job.currency,
        skills: job.skills,
        description: job.description,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        benefits: job.benefits,
        applicationDeadline: job.applicationDeadline,
        vacancies: job.vacancies,
        owner: owner
            ? {
                id: owner._id,
                firstName: owner.firstName,
                lastName: owner.lastName,
                username: owner.username,
                profileImage: owner.profileImage
            }
            : null,
        applicantsCount: job.applicantsCount,
        viewsCount: job.viewsCount,
        status: job.status,
        isFeatured: job.isFeatured,
        isActive: job.isActive,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
    };
};

module.exports = {
    mapJob
};