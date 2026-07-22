const asyncHandler=require("../utils/asyncHandler");
const ApiResponse=require("../utils/ApiResponse");
const aiService=require("../services/ai.service");

const healthController=asyncHandler(async(req,res)=>{

    const data=await aiService.health();

    return res.status(200).json(
        new ApiResponse(
            200,
            "AI Service Connected",
            data
        )
    );

});

const resumeAnalyzerController=asyncHandler(async(req,res)=>{

    const data=await aiService.resumeAnalyzer(
        req.body.resume_text
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Resume analyzed successfully",
            data
        )
    );

});

const jobRecommendationController=asyncHandler(async(req,res)=>{

    const data=await aiService.jobRecommendation(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Job recommendations fetched successfully",
            data
        )
    );

});

const courseRecommendationController=asyncHandler(async(req,res)=>{

    const data=await aiService.courseRecommendation(
        req.body.resume_text
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Course recommendations fetched successfully",
            data
        )
    );

});

const skillGapController=asyncHandler(async(req,res)=>{

    const data=await aiService.skillGap(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Skill gap analyzed successfully",
            data
        )
    );

});

const careerRoadmapController=asyncHandler(async(req,res)=>{

    const data=await aiService.careerRoadmap(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Career roadmap generated successfully",
            data
        )
    );

});

const atsController=asyncHandler(async(req,res)=>{

    const data=await aiService.atsMatch(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "ATS score generated successfully",
            data
        )
    );

});

const interviewController=asyncHandler(async(req,res)=>{

    const data=await aiService.interviewQuestions(
        req.body.resume_text
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Interview questions generated successfully",
            data
        )
    );

});

const learningPathController=asyncHandler(async(req,res)=>{

    const data=await aiService.learningPath(
        req.body.skill
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Learning path generated successfully",
            data
        )
    );

});

const dashboardController=asyncHandler(async(req,res)=>{

    const data=await aiService.dashboard(
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Dashboard generated successfully",
            data
        )
    );

});

module.exports={
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
};