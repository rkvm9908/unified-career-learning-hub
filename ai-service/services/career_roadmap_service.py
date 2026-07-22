def generate_career_roadmap(missing_skills):

    roadmap=[]

    for index,skill in enumerate(missing_skills,start=1):

        roadmap.append({
            "week":index,
            "skill":skill,
            "goal":f"Learn {skill}",
            "tasks":[
                f"Understand {skill} fundamentals",
                f"Complete an online course on {skill}",
                f"Build one mini project using {skill}",
                f"Add {skill} project to portfolio"
            ]
        })

    return{
        "duration":f"{len(roadmap)} Weeks",
        "roadmap":roadmap
    }