from pydantic import BaseModel

class ResumeRequest(BaseModel):
    resume_text:str

class ResumeResponse(BaseModel):
    score:int
    skills:list[str]
    missing_skills:list[str]
    strengths:list[str]
    summary:str