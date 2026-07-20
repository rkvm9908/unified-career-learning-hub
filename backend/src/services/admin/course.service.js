const Course=require("../../models/Course.model");
const ApiError=require("../../utils/ApiError");
const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    COURSE_STATUS
}=require("../../constants/status");

const{
    mapCourse
}=require("../../mappers/course.mapper");

/**
 * Get All Courses
 */
const getAllCoursesAdmin=async(query)=>{

    const{
        page=1,
        limit=10,
        search,
        status,
        level,
        provider,
        sort="latest"
    }=query;

    const filter={};

    if(search){
        filter.$text={
            $search:search
        };
    }

    if(status){
        filter.status=status;
    }

    if(level){
        filter.level=level;
    }

    if(provider){
        filter.provider=provider;
    }

    const sortOption=
        sort==="oldest"
            ?{createdAt:1}
            :{createdAt:-1};

    const skip=
        (Number(page)-1)*
        Number(limit);

    const courses=await Course.find(filter)
        .populate(
            "skills",
            "name category"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total=
        await Course.countDocuments(filter);

    return{
        courses:courses.map(mapCourse),
        pagination:{
            total,
            page:Number(page),
            limit:Number(limit),
            totalPages:Math.ceil(total/Number(limit))
        }
    };

};

/**
 * Get Course By Id
 */
const getCourseByIdAdmin=async(courseId)=>{

    const course=await Course.findById(courseId)
        .populate(
            "skills",
            "name category"
        );

    if(!course){

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );

    }

    return mapCourse(course);

};

/**
 * Update Course Status
 */
const updateCourseStatus=async(
    courseId,
    status
)=>{

    if(
        !Object.values(COURSE_STATUS).includes(status)
    ){
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.INVALID_COURSE_STATUS
        );
    }

    const course=await Course.findById(courseId);

    if(!course){

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );

    }

    course.status=status;

    await course.save();

    return mapCourse(course);

};

/**
 * Delete Course
 */
const deleteCourseAdmin=async(courseId)=>{

    const course=await Course.findById(courseId);

    if(!course){

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );

    }

    course.isActive=false;

    await course.save();

    return mapCourse(course);

};

/**
 * Restore Course
 */
const restoreCourseAdmin=async(courseId)=>{

    const course=await Course.findById(courseId);

    if(!course){

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.COURSE_NOT_FOUND
        );

    }

    course.isActive=true;

    await course.save();

    return mapCourse(course);

};

module.exports={
    getAllCoursesAdmin,
    getCourseByIdAdmin,
    updateCourseStatus,
    deleteCourseAdmin,
    restoreCourseAdmin
};