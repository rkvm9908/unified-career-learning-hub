from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME="AI Service"

HOST=os.getenv("HOST","0.0.0.0")
PORT=int(os.getenv("PORT",8000))