from fastapi import APIRouter, UploadFile, File
from models.request_models import ResumeRequest
from services.resume_service import analyze_resume
from utils.file_parser import extract_text
from services.job_recommendation_service import recommend_jobs
from services.course_recommendation_service import recommend_courses
from schemas.skill_gap import SkillGapRequest
from services.skill_gap_service import analyze_skill_gap
from schemas.career_roadmap import CareerRoadmapRequest
from services.career_roadmap_service import generate_career_roadmap
from schemas.ats_schema import ATSRequest
from services.ats_service import calculate_ats_score
from schemas.interview_schema import InterviewRequest
from services.interview_service import generate_interview_questions
from schemas.learning_path_schema import LearningPathRequest
from services.learning_path_service import generate_learning_path
from schemas.dashboard_schema import DashboardRequest
from services.dashboard_service import generate_dashboard
import shutil
import os

router = APIRouter()


@router.get("/health")
def health():

    return {
        "success": True,
        "message": "AI Service Healthy"
    }

@router.post("/resume-analyzer")
def resume_analyzer(request: ResumeRequest):

    result = analyze_resume(
        request.resume_text
    )

    return {
        "success": True,
        "data": result
    }

@router.post("/job-recommendation")
def job_recommendation(request: ResumeRequest):

    result=analyze_resume(
        request.resume_text
    )

    jobs=recommend_jobs(
        result["skills"]
    )

    return{
        "success":True,
        "resumeAnalysis":result,
        "recommendedJobs":jobs
    }

@router.post("/course-recommendation")
def course_recommendation(request:ResumeRequest):
    analysis=analyze_resume(
        request.resume_text
    )
    courses=recommend_courses(
        analysis["missing_skills"]
    )
    return{
        "success":True,
        "resumeAnalysis":analysis,
        "recommendedCourses":courses
    }

@router.post("/skill-gap")
def skill_gap(request:SkillGapRequest):

    result=analyze_skill_gap(
        request.resume_text,
        request.job.model_dump()
    )

    return{
        "success":True,
        "data":result
    }

@router.post("/career-roadmap")
def career_roadmap(request:CareerRoadmapRequest):
    roadmap=generate_career_roadmap(
        request.missing_skills
    )
    return{
        "success":True,
        "data":roadmap
    }

@router.post("/ats-match")
def ats_match(request:ATSRequest):

    result=calculate_ats_score(
        request.resume_text,
        request.job_description
    )

    return{
        "success":True,
        "data":result
    }
    
@router.post("/interview-questions")
def interview_questions(request:InterviewRequest):

    result=generate_interview_questions(
        request.resume_text
    )

    return{
        "success":True,
        "data":result
    }

@router.post("/learning-path")
def learning_path(request:LearningPathRequest):

    result=generate_learning_path(
        request.skill
    )

    return{
        "success":True,
        "data":result
    }

@router.post("/dashboard")
def dashboard(request:DashboardRequest):

    dashboard_data=generate_dashboard(
        request.resume_text,
        [job.model_dump() for job in request.jobs]
    )

    return{
        "success":True,
        "data":dashboard_data
    }

@router.post("/resume-upload")
async def resume_upload(file: UploadFile = File(...)):

    upload_folder = "uploads"

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    resume_text = extract_text(file_path)

    result = analyze_resume(
        resume_text
    )

    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "success": True,
        "data": result
    }