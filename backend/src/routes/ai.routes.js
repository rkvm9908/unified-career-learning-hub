const express=require("express");

const{
    healthController,
    resumeAnalyzerController,
    jobRecommendationController,
    courseRecommendationController,
    skillGapController,
    careerRoadmapController,
    atsController,
    interviewController,
    learningPathController,
    dashboardController
}=require("../controllers/ai.controller");

const{
    protect
}=require("../middleware/auth.middleware");

const router=express.Router();

router.get(
    "/health",
    healthController
);

router.post(
    "/resume-analyzer",
    protect,
    resumeAnalyzerController
);

router.post(
    "/job-recommendation",
    protect,
    jobRecommendationController
);

router.post(
    "/course-recommendation",
    protect,
    courseRecommendationController
);

router.post(
    "/skill-gap",
    protect,
    skillGapController
);

router.post(
    "/career-roadmap",
    protect,
    careerRoadmapController
);

router.post(
    "/ats-match",
    protect,
    atsController
);

router.post(
    "/interview-questions",
    protect,
    interviewController
);

router.post(
    "/learning-path",
    protect,
    learningPathController
);

router.post(
    "/dashboard",
    protect,
    dashboardController
);

module.exports=router;