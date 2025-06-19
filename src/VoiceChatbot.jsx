import React, { useState } from "react";

function VoiceChatbot() {
  const [chat, setChat] = useState([]);
  const [listening, setListening] = useState(false);

  const synth = window.speechSynthesis;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;

  const handleVoiceInput = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      addToChat("You", transcript);
      recognition.stop();
      setListening(false);

      // Send to FastAPI backend
      const res = await fetch("http://192.168.100.87:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: transcript }),
      });

      const data = await res.json();
      if (data.answer) {
        addToChat("Bot", data.answer);
        speak(data.answer);
      } else {
        addToChat("Bot", "❌ Error: Could not get a response.");
      }
    };

    recognition.onerror = (e) => {
      console.error("Recognition error:", e);
      setListening(false);
    };
  };

  const addToChat = (sender, text) => {
    setChat((prev) => [...prev, { sender, text }]);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div>
      <div className="chat-box">
        {chat.map((item, index) => (
          <div key={index} className={item.sender === "You" ? "user" : "bot"}>
            <strong>{item.sender}:</strong> {item.text}
          </div>
        ))}
      </div>
      <button onClick={handleVoiceInput} disabled={listening}>
        🎤 {listening ? "Listening..." : "Speak"}
      </button>
    </div>
  );
}

export default VoiceChatbot;

