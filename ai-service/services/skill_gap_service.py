from services.resume_service import analyze_resume

def analyze_skill_gap(resume_text,job):

    analysis=analyze_resume(resume_text)

    resume_skills=set(analysis["skills"])

    job_skills=set(job["skills"])

    matched_skills=list(
        resume_skills.intersection(job_skills)
    )

    missing_skills=list(
        job_skills.difference(resume_skills)
    )

    match_percentage=round(
        (len(matched_skills)/len(job_skills))*100,
        2
    ) if job_skills else 0

    if match_percentage>=80:
        level="Excellent Match"
    elif match_percentage>=60:
        level="Good Match"
    elif match_percentage>=40:
        level="Average Match"
    else:
        level="Needs Improvement"

    return{
        "resumeSkills":analysis["skills"],
        "jobSkills":job["skills"],
        "matchedSkills":matched_skills,
        "missingSkills":missing_skills,
        "matchPercentage":match_percentage,
        "level":level
    }