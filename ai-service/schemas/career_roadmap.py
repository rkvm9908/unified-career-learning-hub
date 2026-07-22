from pydantic import BaseModel
from typing import List

class CareerRoadmapRequest(BaseModel):
    missing_skills:List[str]