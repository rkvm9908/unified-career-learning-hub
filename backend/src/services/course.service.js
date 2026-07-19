const Course = require("../models/course.model");

const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Create Course
 */
const createCourse = async (courseData) => {
    const existingCourse = await Course.findOne({
        title: {
            $regex: new RegExp(`^${courseData.title}$`, "i")
        },
        provider: {
            $regex: new RegExp(`^${courseData.provider}$`, "i")
        },
        isActive: true
    });

    if (existingCourse) {
        throw new ApiError(
            409,
            RESPONSE_MESSAGES.COURSE_ALREADY_EXISTS
        );
    }

    return await Course.create(courseData);
};

/**
 * Get All Courses
 */
const getAllCourses = async (query) => {
    const {
        search,
        level,
        provider,
        isFree,
        page = 1,
        limit = 10
    } = query;

    const filter = {
        isActive: true,
        status: "Published"
    };

    if (search) {
        filter.$text = {
            $search: search
        };
    }

    if (level) {
        filter.level = level;
    }

    if (provider) {
        filter.provider = provider;
    }

    if (isFree !== undefined) {
        filter.isFree = isFree === "true";
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [courses, total] = await Promise.all([
        Course.find(filter)
            .populate("skills", "name category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        Course.countDocuments(filter)
    ]);

    return {
        courses,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
        }
    };
};

/**
 * Get Course By ID
 */
const getCourseById = async (courseId) => {
    const course = await Course.findOne({
        _id: courseId,
        isActive: true
    }).populate("skills", "name category");

    if (!course) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );
    }

    return course;
};

/**
 * Update Course
 */
const updateCourse = async (
    courseId,
    updateData
) => {
    const course = await Course.findOne({
        _id: courseId,
        isActive: true
    });

    if (!course) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );
    }

    Object.assign(course, updateData);

    await course.save();

    return course;
};

/**
 * Delete Course
 */
const deleteCourse = async (courseId) => {
    const course = await Course.findOne({
        _id: courseId,
        isActive: true
    });

    if (!course) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );
    }

    course.isActive = false;

    await course.save();
};

/**
 * Search Courses
 */
const searchCourses = async (keyword) => {
    return await Course.find({
        $text: {
            $search: keyword
        },
        isActive: true,
        status: "Published"
    })
        .populate("skills", "name category")
        .limit(10);
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    searchCourses
};