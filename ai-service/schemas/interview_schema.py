from pydantic import BaseModel

class InterviewRequest(BaseModel):
    resume_text:str