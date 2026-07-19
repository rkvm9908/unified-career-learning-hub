const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    searchCourses
} = require("../services/course.service");

/**
 * Create Course
 */
const createCourseController = asyncHandler(async (req, res) => {
    const course = await createCourse(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.COURSE_CREATED,
            course
        )
    );
});

/**
 * Get All Courses
 */
const getAllCoursesController = asyncHandler(async (req, res) => {
    const result = await getAllCourses(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSES_FETCHED,
            result
        )
    );
});

/**
 * Get Course By ID
 */
const getCourseByIdController = asyncHandler(async (req, res) => {
    const course = await getCourseById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_FETCHED,
            course
        )
    );
});

/**
 * Update Course
 */
const updateCourseController = asyncHandler(async (req, res) => {
    const course = await updateCourse(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_UPDATED,
            course
        )
    );
});

/**
 * Delete Course
 */
const deleteCourseController = asyncHandler(async (req, res) => {
    await deleteCourse(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_DELETED
        )
    );
});

/**
 * Search Courses
 */
const searchCoursesController = asyncHandler(async (req, res) => {
    const courses = await searchCourses(
        req.query.keyword || ""
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSES_FETCHED,
            courses
        )
    );
});

module.exports = {
    createCourseController,
    getAllCoursesController,
    getCourseByIdController,
    updateCourseController,
    deleteCourseController,
    searchCoursesController
};