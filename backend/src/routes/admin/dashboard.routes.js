const express=require("express");

const{
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
}=require("../../controllers/admin/dashboard.controller");

const{
    protect
}=require("../../middleware/auth.middleware");

const{
    authorize
}=require("../../middleware/role.middleware");

const ROLES=require("../../constants/roles");

const router=express.Router();

router.use(
    protect,
    authorize(ROLES.ADMIN)
);

/**
 * Dashboard
 */
router.get(
    "/statistics",
    getDashboardStatisticsController
);

router.get(
    "/charts",
    getDashboardChartsController
);

router.get(
    "/platform-statistics",
    getPlatformStatisticsController
);

router.get(
    "/system-health",
    getSystemHealthController
);

/**
 * Recent Data
 */
router.get(
    "/recent-users",
    getRecentUsersController
);

router.get(
    "/recent-jobs",
    getRecentJobsController
);

router.get(
    "/recent-applications",
    getRecentApplicationsController
);

/**
 * Growth
 */
router.get(
    "/growth/users",
    getMonthlyUserGrowthController
);

router.get(
    "/growth/jobs",
    getMonthlyJobGrowthController
);

router.get(
    "/growth/applications",
    getMonthlyApplicationGrowthController
);

/**
 * Top Lists
 */
router.get(
    "/top-skills",
    getTopSkillsController
);

router.get(
    "/top-courses",
    getTopCoursesController
);

router.get(
    "/top-recruiters",
    getTopRecruitersController
);

module.exports=router;