const User=require("../models/user.model");
const Job=require("../models/job.model");
const Course=require("../models/course.model");
const Skill=require("../models/skill.model");

const ApiError=require("../utils/ApiError");
const RESPONSE_MESSAGES=require("../constants/responseMessages");

/**
 * Search Users
 */
const searchUsers=async(keyword)=>{

    return await User.find({
        isActive:true,
        $or:[
            {
                firstName:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                lastName:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                username:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                email:{
                    $regex:keyword,
                    $options:"i"
                }
            }
        ]
    })
    .select("-password -refreshToken")
    .limit(10);

};

/**
 * Search Jobs
 */
const searchJobs=async(keyword)=>{

    return await Job.find({
        isActive:true,
        $or:[
            {
                title:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                company:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                description:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                location:{
                    $regex:keyword,
                    $options:"i"
                }
            }
        ]
    })
    .populate(
        "owner",
        "firstName lastName username profileImage"
    )
    .limit(10);

};

/**
 * Search Courses
 */
const searchCourses=async(keyword)=>{

    return await Course.find({
        isActive:true,
        $or:[
            {
                title:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                description:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                provider:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                category:{
                    $regex:keyword,
                    $options:"i"
                }
            }
        ]
    })
    .populate(
        "skills",
        "name"
    )
    .populate(
        "instructor",
        "firstName lastName username profileImage"
    )
    .limit(10);

};

/**
 * Search Skills
 */
const searchSkills=async(keyword)=>{

    return await Skill.find({
        isActive:true,
        $or:[
            {
                name:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                category:{
                    $regex:keyword,
                    $options:"i"
                }
            },
            {
                description:{
                    $regex:keyword,
                    $options:"i"
                }
            }
        ]
    })
    .limit(10);

};

/**
 * Global Search
 */
const searchAll=async(query,type)=>{

    if(!query){

        throw new ApiError(
            400,
            RESPONSE_MESSAGES.SEARCH_QUERY_REQUIRED
        );

    }

    switch(type){

            case "users":
                return{
                    results:await searchUsers(query)
                };

            case "jobs":
                return{
                    results:await searchJobs(query)
                };

            case "courses":
                return{
                    results:await searchCourses(query)
                };

            case "skills":
                return{
                    results:await searchSkills(query)
                };

            default: {

                const [
                    users,
                    jobs,
                    courses,
                    skills
                ] = await Promise.all([
                    searchUsers(query),
                    searchJobs(query),
                    searchCourses(query),
                    searchSkills(query)
                ]);

                return {
                    users,
                    jobs,
                    courses,
                    skills
                };

            }

        }

};

module.exports={
    searchAll
};