from pydantic import BaseModel
from typing import List

class JobSkillGap(BaseModel):
    title:str
    company:str
    skills:List[str]

class SkillGapRequest(BaseModel):
    resume_text:str
    job:JobSkillGap