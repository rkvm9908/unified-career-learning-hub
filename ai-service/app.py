from fastapi import FastAPI
from routes.ai_routes import router
from config import APP_NAME

app=FastAPI(
    title=APP_NAME,
    version="1.0.0"
)

app.include_router(
    router,
    prefix="/api/ai",
    tags=["AI"]
)

@app.get("/")
def home():
    return{
        "success":True,
        "message":"AI Service Running"
    }