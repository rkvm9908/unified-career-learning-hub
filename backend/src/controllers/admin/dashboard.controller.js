const asyncHandler=require("../../utils/asyncHandler");
const ApiResponse=require("../../utils/ApiResponse");
const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    getDashboardStatistics,
    getRecentUsers,
    getRecentJobs,
    getRecentApplications,
    getMonthlyUserGrowth,
    getMonthlyJobGrowth,
    getMonthlyApplicationGrowth,
    getTopSkills,
    getTopCourses,
    getTopRecruiters,
    getPlatformStatistics,
    getSystemHealth,
    getDashboardCharts
}=require("../../services/admin/dashboard.service");
/**
 * Dashboard Statistics
 */
const getDashboardStatisticsController = asyncHandler(async (req, res) => {
    const statistics = await getDashboardStatistics();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.DATA_FETCHED,
            statistics
        )
    );
});
const getRecentUsersController=asyncHandler(async(req,res)=>{

    const result=await getRecentUsers();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RECENT_USERS_FETCHED,
            result
        )
    );

});
const getRecentJobsController=asyncHandler(async(req,res)=>{

    const result=await getRecentJobs();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RECENT_JOBS_FETCHED,
            result
        )
    );

});
const getRecentApplicationsController=asyncHandler(async(req,res)=>{

    const result=await getRecentApplications();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.RECENT_APPLICATIONS_FETCHED,
            result
        )
    );

});
const getMonthlyUserGrowthController=asyncHandler(async(req,res)=>{

    const result=await getMonthlyUserGrowth();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.USER_GROWTH_FETCHED,
            result
        )
    );

});
const getMonthlyJobGrowthController=asyncHandler(async(req,res)=>{

    const result=await getMonthlyJobGrowth();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.JOB_GROWTH_FETCHED,
            result
        )
    );

});
const getMonthlyApplicationGrowthController=asyncHandler(async(req,res)=>{

    const result=await getMonthlyApplicationGrowth();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.APPLICATION_GROWTH_FETCHED,
            result
        )
    );

});
const getTopSkillsController=asyncHandler(async(req,res)=>{

    const result=await getTopSkills();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.TOP_SKILLS_FETCHED,
            result
        )
    );

});
const getTopCoursesController=asyncHandler(async(req,res)=>{

    const result=await getTopCourses();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.TOP_COURSES_FETCHED,
            result
        )
    );

});
const getTopRecruitersController=asyncHandler(async(req,res)=>{

    const result=await getTopRecruiters();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.TOP_RECRUITERS_FETCHED,
            result
        )
    );

});
const getPlatformStatisticsController=asyncHandler(async(req,res)=>{

    const result=await getPlatformStatistics();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PLATFORM_STATISTICS_FETCHED,
            result
        )
    );

});
const getSystemHealthController=asyncHandler(async(req,res)=>{

    const result=await getSystemHealth();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SYSTEM_HEALTH_FETCHED,
            result
        )
    );

});
const getDashboardChartsController=asyncHandler(async(req,res)=>{

    const result=await getDashboardCharts();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.DASHBOARD_CHARTS_FETCHED,
            result
        )
    );

});
module.exports={
    getDashboardStatisticsController,
    getRecentUsersController,
    getRecentJobsController,
    getRecentApplicationsController,
    getMonthlyUserGrowthController,
    getMonthlyJobGrowthController,
    getMonthlyApplicationGrowthController,
    getTopSkillsController,
    getTopCoursesController,
    getTopRecruitersController,
    getPlatformStatisticsController,
    getSystemHealthController,
    getDashboardChartsController
};