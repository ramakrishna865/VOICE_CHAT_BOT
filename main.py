from fastapi import FastAPI, Request
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware


genai.configure(api_key="AIzaSyAfwSscFYcUwKDzLAZu_frlFZw4rBQiY")
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ✅ Request schema
class QuestionRequest(BaseModel):
    question: str


@app.post("/ask")
async def ask_gemini(request: QuestionRequest):
    try:
        
        modified_question = f"{request.question.strip()} Please answer the question in 10 to 30 words only."
        response = model.generate_content(modified_question)
        return {"answer": response.text}
    except Exception as e:
        return {"error": str(e)}

