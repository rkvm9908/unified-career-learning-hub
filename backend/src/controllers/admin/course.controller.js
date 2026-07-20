const asyncHandler=require("../../utils/asyncHandler");
const ApiResponse=require("../../utils/ApiResponse");

const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    getAllCoursesAdmin,
    getCourseByIdAdmin,
    updateCourseStatus,
    deleteCourseAdmin,
    restoreCourseAdmin
}=require("../../services/admin/course.service");

/**
 * Get All Courses
 */
const getAllCoursesAdminController=asyncHandler(async(req,res)=>{

    const result=await getAllCoursesAdmin(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSES_FETCHED,
            result
        )
    );

});

/**
 * Get Course By Id
 */
const getCourseByIdAdminController=asyncHandler(async(req,res)=>{

    const course=await getCourseByIdAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_FETCHED,
            course
        )
    );

});

/**
 * Update Course Status
 */
const updateCourseStatusController=asyncHandler(async(req,res)=>{

    const course=await updateCourseStatus(
        req.params.id,
        req.body.status
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_STATUS_UPDATED,
            course
        )
    );

});

/**
 * Delete Course
 */
const deleteCourseAdminController=asyncHandler(async(req,res)=>{

    const course=await deleteCourseAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_DELETED,
            course
        )
    );

});

/**
 * Restore Course
 */
const restoreCourseAdminController=asyncHandler(async(req,res)=>{

    const course=await restoreCourseAdmin(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.COURSE_RESTORED,
            course
        )
    );

});

module.exports={
    getAllCoursesAdminController,
    getCourseByIdAdminController,
    updateCourseStatusController,
    deleteCourseAdminController,
    restoreCourseAdminController
};