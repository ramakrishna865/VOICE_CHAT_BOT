# 🎤 Voice Chatbot using React, FastAPI & Gemini AI

This is a simple full-stack voice-based chatbot. It uses your microphone to capture a question, sends it to the Gemini AI model through a FastAPI backend, and then speaks the answer aloud using browser TTS (Text-to-Speech).

---

## 🧠 Features

- 🎙️ Voice Input using Web Speech API (Speech Recognition)
- 🤖 Gemini 1.5 Flash for AI-powered answers
- 🔊 Text-to-Speech (TTS) for spoken responses
- 💬 Clean Chat UI with speaker tags
- 🚀 React + FastAPI integration

 **requirements.txt**
fastapi
uvicorn
pydantic
google-generativeai

**Run with specific host and port**
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

**Run the FastAPI Server (development mode)**
uvicorn main:app --reload

