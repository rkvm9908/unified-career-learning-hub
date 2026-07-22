from pydantic import BaseModel

class LearningPathRequest(BaseModel):
    skill:str