from pydantic import BaseModel
from typing import List

class Job(BaseModel):
    id:int
    title:str
    company:str
    skills:List[str]

class DashboardRequest(BaseModel):
    resume_text:str
    jobs:List[Job]