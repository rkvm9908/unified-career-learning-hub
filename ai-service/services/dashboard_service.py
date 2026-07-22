from services.resume_service import analyze_resume
from services.job_recommendation_service import recommend_jobs
from services.course_recommendation_service import recommend_courses

def generate_dashboard(resume_text,jobs):

    analysis=analyze_resume(resume_text)

    recommended_jobs=recommend_jobs(
        analysis["skills"],
        jobs
    )

    recommended_courses=recommend_courses(
        analysis["missing_skills"]
    )

    return{
        "resumeScore":analysis["score"],
        "totalSkills":len(analysis["skills"]),
        "missingSkills":analysis["missing_skills"],
        "recommendedJobs":recommended_jobs[:5],
        "recommendedCourses":recommended_courses[:5],
        "strengths":analysis["strengths"],
        "summary":analysis["summary"]
    }