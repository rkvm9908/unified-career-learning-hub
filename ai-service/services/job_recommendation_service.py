import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def recommend_jobs(user_skills,jobs):

    with open(
        "data/jobs.json",
        "r",
        encoding="utf-8"
    ) as file:
        jobs=json.load(file)
    documents=[]

    for job in jobs:
        documents.append(
            " ".join(job["skills"])
        )

    documents.append(
        " ".join(user_skills)
    )

    vectorizer=CountVectorizer()

    vectors=vectorizer.fit_transform(
        documents
    )

    similarity=cosine_similarity(
        vectors[-1],
        vectors[:-1]
    )[0]

    recommendations=[]

    for score,job in zip(
        similarity,
        jobs
    ):

        recommendations.append({
            "id":job["id"],
            "title":job["title"],
            "company":job["company"],
            "match":round(
                score*100,
                2
            ),
            "requiredSkills":job["skills"]
        })

    recommendations.sort(
        key=lambda x:x["match"],
        reverse=True
    )

    return recommendations[:5]