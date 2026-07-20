const User=require("../../models/User.model");
const Job=require("../../models/Job.model");
const Application=require("../../models/Application.model");
const Course=require("../../models/Course.model");
const Skill=require("../../models/Skill.model");
const Certification=require("../../models/Certification.model");
const ROLES=require("../../constants/roles");
/**
 * Get Dashboard Statistics
 */
const getDashboardStatistics = async () => {
    const [
        totalUsers,
        totalRecruiters,
        totalApplicants,
        totalJobs,
        totalApplications,
        totalCourses,
        totalSkills,
        totalCertifications,
        activeJobs,
        closedJobs
    ] = await Promise.all([
        User.countDocuments({ isActive: true }),
        User.countDocuments({
            role: "Recruiter",
            isActive: true
        }),
        User.countDocuments({
            role: "Applicant",
            isActive: true
        }),
        Job.countDocuments({ isActive: true }),
        Application.countDocuments({ isActive: true }),
        Course.countDocuments({ isActive: true }),
        Skill.countDocuments({ isActive: true }),
        Certification.countDocuments({ isActive: true }),
        Job.countDocuments({
            status: "Open",
            isActive: true
        }),
        Job.countDocuments({
            status: "Closed",
            isActive: true
        })
    ]);

    return {
        users: {
            total: totalUsers,
            recruiters: totalRecruiters,
            applicants: totalApplicants
        },
        jobs: {
            total: totalJobs,
            active: activeJobs,
            closed: closedJobs
        },
        applications: totalApplications,
        courses: totalCourses,
        skills: totalSkills,
        certifications: totalCertifications
    };
};

/**
 * Recent Users
 */
const getRecentUsers=async()=>{

    const users=await User.find({
        isActive:true
    })
    .select(
        "firstName lastName username email role profileImage createdAt"
    )
    .sort({
        createdAt:-1
    })
    .limit(10);

    return users;

};

/**
 * Recent Jobs
 */
const getRecentJobs=async()=>{

    const jobs=await Job.find({
        isActive:true
    })
    .populate(
        "owner",
        "firstName lastName username profileImage"
    )
    .select(
        "title company status location createdAt owner"
    )
    .sort({
        createdAt:-1
    })
    .limit(10);

    return jobs;

};

/**
 * Recent Applications
 */
const getRecentApplications=async()=>{

    const applications=await Application.find({
        isActive:true
    })
    .populate(
        "applicant",
        "firstName lastName username profileImage"
    )
    .populate(
        "job",
        "title company"
    )
    .select(
        "status applicant job createdAt"
    )
    .sort({
        createdAt:-1
    })
    .limit(10);

    return applications;

};

/**
 * Monthly User Growth
 */
const getMonthlyUserGrowth=async()=>{

    const users=await User.aggregate([
        {
            $match:{
                isActive:true
            }
        },
        {
            $group:{
                _id:{
                    year:{
                        $year:"$createdAt"
                    },
                    month:{
                        $month:"$createdAt"
                    }
                },
                total:{
                    $sum:1
                }
            }
        },
        {
            $sort:{
                "_id.year":1,
                "_id.month":1
            }
        }
    ]);

    return users;

};

/**
 * Monthly Job Growth
 */
const getMonthlyJobGrowth=async()=>{

    const jobs=await Job.aggregate([
        {
            $match:{
                isActive:true
            }
        },
        {
            $group:{
                _id:{
                    year:{
                        $year:"$createdAt"
                    },
                    month:{
                        $month:"$createdAt"
                    }
                },
                total:{
                    $sum:1
                }
            }
        },
        {
            $sort:{
                "_id.year":1,
                "_id.month":1
            }
        }
    ]);

    return jobs;

};  

/**
 * Monthly Application Growth
 */
const getMonthlyApplicationGrowth=async()=>{

    const applications=await Application.aggregate([
        {
            $match:{
                isActive:true
            }
        },
        {
            $group:{
                _id:{
                    year:{
                        $year:"$createdAt"
                    },
                    month:{
                        $month:"$createdAt"
                    }
                },
                total:{
                    $sum:1
                }
            }
        },
        {
            $sort:{
                "_id.year":1,
                "_id.month":1
            }
        }
    ]);

    return applications;

};
/**
 * Top Skills
 */
const getTopSkills=async()=>{

    const skills=await Skill.find({
        isActive:true
    })
    .sort({
        userCount:-1,
        jobCount:-1,
        courseCount:-1
    })
    .limit(10);

    return skills;

};

/**
 * Top Courses
 */
const getTopCourses=async()=>{

    const courses=await Course.find({
        isActive:true
    })
    .populate(
        "skills",
        "name"
    )
    .sort({
        totalEnrollments:-1,
        rating:-1
    })
    .limit(10);

    return courses;

};

/**
 * Top Recruiters
 */
const getTopRecruiters=async()=>{

    const recruiters=await User.find({
        role:ROLES.RECRUITER,
        isActive:true
    })
    .select(
        "firstName lastName username profileImage"
    )
    .sort({
        createdAt:-1
    })
    .limit(10);

    return recruiters;

};

/**
 * Platform Statistics
 */
const getPlatformStatistics=async()=>{

    const[
        users,
        recruiters,
        jobs,
        applications,
        courses,
        skills,
        certifications
    ]=await Promise.all([
        User.countDocuments(),
        User.countDocuments({
            role:ROLES.RECRUITER
        }),
        Job.countDocuments(),
        Application.countDocuments(),
        Course.countDocuments(),
        Skill.countDocuments(),
        Certification.countDocuments()
    ]);

    return{
        users,
        recruiters,
        jobs,
        applications,
        courses,
        skills,
        certifications
    };

};

/**
 * System Health
 */
const getSystemHealth=async()=>{

    return{
        database:"Healthy",
        api:"Running",
        serverTime:new Date(),
        uptime:process.uptime()
    };

};

/**
 * Dashboard Charts
 */
const getDashboardCharts=async()=>{

    const[
        userGrowth,
        jobGrowth,
        applicationGrowth
    ]=await Promise.all([
        getMonthlyUserGrowth(),
        getMonthlyJobGrowth(),
        getMonthlyApplicationGrowth()
    ]);

    return{
        userGrowth,
        jobGrowth,
        applicationGrowth
    };

};

module.exports={
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
    getDashboardCharts,

};