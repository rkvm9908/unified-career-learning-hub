const axios=require("axios");
const{AI_SERVICE_URL}=require("../config/ai.config");

const aiClient=axios.create({
    baseURL:AI_SERVICE_URL,
    timeout:30000,
    headers:{
        "Content-Type":"application/json"
    }
});

const health=async()=>{

    const response=await aiClient.get(
        "/api/ai/health"
    );

    return response.data;

};

const resumeAnalyzer=async(resume_text)=>{

    const response=await aiClient.post(
        "/api/ai/resume-analyzer",
        {
            resume_text
        }
    );

    return response.data;

};

const jobRecommendation=async(data)=>{

    const response=await aiClient.post(
        "/api/ai/job-recommendation",
        data
    );

    return response.data;

};

const courseRecommendation=async(resume_text)=>{

    const response=await aiClient.post(
        "/api/ai/course-recommendation",
        {
            resume_text
        }
    );

    return response.data;

};

const skillGap=async(data)=>{

    const response=await aiClient.post(
        "/api/ai/skill-gap",
        data
    );

    return response.data;

};

const careerRoadmap=async(data)=>{

    const response=await aiClient.post(
        "/api/ai/career-roadmap",
        data
    );

    return response.data;

};

const atsMatch=async(data)=>{

    const response=await aiClient.post(
        "/api/ai/ats-match",
        data
    );

    return response.data;

};

const interviewQuestions=async(resume_text)=>{

    const response=await aiClient.post(
        "/api/ai/interview-questions",
        {
            resume_text
        }
    );

    return response.data;

};

const learningPath=async(skill)=>{

    const response=await aiClient.post(
        "/api/ai/learning-path",
        {
            skill
        }
    );

    return response.data;

};

const dashboard=async(data)=>{

    const response=await aiClient.post(
        "/api/ai/dashboard",
        data
    );

    return response.data;

};

module.exports={
    health,
    resumeAnalyzer,
    jobRecommendation,
    courseRecommendation,
    skillGap,
    careerRoadmap,
    atsMatch,
    interviewQuestions,
    learningPath,
    dashboard
};