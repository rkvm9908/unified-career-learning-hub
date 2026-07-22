from services.resume_service import analyze_resume

QUESTION_BANK={
    "Java":[
        "What is JVM?",
        "Explain OOP concepts.",
        "What is the difference between Abstract Class and Interface?"
    ],
    "Python":[
        "What are Python decorators?",
        "Explain List vs Tuple.",
        "What is a virtual environment?"
    ],
    "React":[
        "What is Virtual DOM?",
        "Explain React Hooks.",
        "Difference between State and Props?"
    ],
    "Node.js":[
        "What is Event Loop?",
        "Explain Middleware.",
        "Difference between CommonJS and ES Modules?"
    ],
    "MySQL":[
        "Difference between DELETE, TRUNCATE and DROP?",
        "What are Joins?",
        "Explain Indexing."
    ],
    "MongoDB":[
        "Difference between SQL and MongoDB?",
        "What is Aggregation Pipeline?",
        "Explain Indexes in MongoDB."
    ],
    "Git":[
        "Difference between Merge and Rebase?",
        "Explain Git Stash.",
        "What is Cherry Pick?"
    ],
    "Docker":[
        "What is Docker?",
        "Difference between Image and Container?",
        "Explain Docker Compose."
    ]
}

def generate_interview_questions(resume_text):

    analysis=analyze_resume(resume_text)

    questions=[]

    for skill in analysis["skills"]:

        if skill in QUESTION_BANK:

            questions.append({
                "skill":skill,
                "questions":QUESTION_BANK[skill]
            })

    return{
        "totalSkills":len(analysis["skills"]),
        "interviewSets":questions
    }