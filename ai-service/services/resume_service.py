from utils.skills import TECH_SKILLS
from utils.text_preprocessing import preprocess

def analyze_resume(text:str):

    processed=preprocess(text)

    found=[]

    missing=[]

    for skill in TECH_SKILLS:

        if skill.lower() in processed:

            found.append(skill)

        else:

            missing.append(skill)

    score=min(
        len(found)*4,
        100
    )

    strengths=[]

    if len(found)>=10:

        strengths.append(
            "Strong Technical Skill Set"
        )

    elif len(found)>=5:

        strengths.append(
            "Good Technical Foundation"
        )

    else:

        strengths.append(
            "Needs More Technical Skills"
        )

    summary=f"Detected {len(found)} technical skills."

    return{
        "score":score,
        "skills":found,
        "missing_skills":missing,
        "strengths":strengths,
        "summary":summary
    }