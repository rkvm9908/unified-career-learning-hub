import json

def recommend_courses(missing_skills):
    with open(
        "data/courses.json",
        "r",
        encoding="utf-8"
    ) as file:
        courses=json.load(file)
    recommendations=[]
    for course in courses:
        matched=[]
        for skill in course["skills"]:
            if skill in missing_skills:
                matched.append(skill)
        if matched:
            recommendations.append({
                "id":course["id"],
                "title":course["title"],
                "provider":course["provider"],
                "url":course["url"],
                "skillsCovered":matched,
                "priority":len(matched)
            })
    recommendations.sort(
        key=lambda x:x["priority"],
        reverse=True
    )

    return recommendations