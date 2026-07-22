LEARNING_PATH={

    "Java":[
        "Java Basics",
        "OOP",
        "Collections",
        "Exception Handling",
        "Multithreading",
        "Spring Boot",
        "REST API",
        "Microservices"
    ],

    "Python":[
        "Python Basics",
        "Functions",
        "OOP",
        "File Handling",
        "NumPy",
        "Pandas",
        "Flask",
        "FastAPI"
    ],

    "React":[
        "HTML",
        "CSS",
        "JavaScript",
        "ES6",
        "React Basics",
        "Hooks",
        "React Router",
        "Redux"
    ],

    "Node.js":[
        "JavaScript",
        "Node Basics",
        "Express",
        "MongoDB",
        "Authentication",
        "JWT",
        "REST API",
        "Socket.IO"
    ],

    "Docker":[
        "Containers",
        "Images",
        "Dockerfile",
        "Docker Compose",
        "Docker Networking"
    ],

    "AWS":[
        "Cloud Basics",
        "EC2",
        "S3",
        "IAM",
        "RDS",
        "Lambda"
    ]

}

def generate_learning_path(skill):

    roadmap=LEARNING_PATH.get(skill)

    if roadmap is None:

        return{
            "skill":skill,
            "available":False,
            "message":"Learning path not available."
        }

    return{
        "skill":skill,
        "available":True,
        "topics":roadmap,
        "estimatedDuration":f"{len(roadmap)} Weeks"
    }