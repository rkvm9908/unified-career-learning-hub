from services.resume_service import analyze_resume

def calculate_ats_score(resume_text,job_description):

    analysis=analyze_resume(resume_text)

    resume_skills=set(
        skill.lower()
        for skill in analysis["skills"]
    )

    words=job_description.replace(","," ").split()

    job_keywords=set(
        word.strip().lower()
        for word in words
    )

    matched_keywords=list(
        resume_skills.intersection(job_keywords)
    )

    missing_keywords=list(
        job_keywords.difference(resume_skills)
    )

    ats_score=round(
        (len(matched_keywords)/len(job_keywords))*100,
        2
    ) if job_keywords else 0

    if ats_score>=80:
        recommendation="Excellent ATS Match"
    elif ats_score>=60:
        recommendation="Good ATS Match"
    elif ats_score>=40:
        recommendation="Average ATS Match"
    else:
        recommendation="Low ATS Match"

    return{
        "atsScore":ats_score,
        "matchedKeywords":sorted(matched_keywords),
        "missingKeywords":sorted(missing_keywords),
        "recommendation":recommendation
    }