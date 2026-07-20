const mapCourse = (course) => {

    if (!course) {
        return null;
    }

    return {
        id: course._id,
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        provider: course.provider,
        thumbnail: course.thumbnail,
        courseUrl: course.courseUrl,
        skills: course.skills,
        level: course.level,
        duration: course.duration,
        language: course.language,
        status: course.status,
        isFree: course.isFree,
        rating: course.rating,
        totalEnrollments: course.totalEnrollments,
        isActive: course.isActive,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
    };

};

module.exports = {
    mapCourse
};