🤖 Gemini AI Chatbot
AI Productivity and AI API Integration for Developers

Organized by Hacktiv8

📌 Overview

Project ini adalah implementasi sederhana chatbot berbasis Google Gemini AI API menggunakan:

🟢 Node.js + Express (Backend)

🎨 Vanilla HTML, CSS, JavaScript (Frontend)

🔐 Environment Variable untuk API Key

🌐 REST API integration

Tujuan project ini adalah memahami bagaimana cara mengintegrasikan AI ke dalam aplikasi web secara real-world.

🚀 Features

✅ Chatbot berbasis Gemini 2.5 Flash

✅ REST API endpoint /api/chat

✅ Multi-turn conversation support

✅ Modern UI chat bubble

✅ Error handling & validation

✅ Environment variable security (.env)

✅ CORS enabled

🏗️ Project Structure
project-folder/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── package.json
└── index.js
🔧 Installation
1️⃣ Clone Repository
git clone https://github.com/username/gemini-chatbot.git
cd gemini-chatbot
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variable

Buat file .env:

GEMINI_API_KEY=your_api_key_here

Dapatkan API Key dari:
👉 https://aistudio.google.com/

4️⃣ Run Server
node index.js

Server akan berjalan di:

http://localhost:3000
📡 API Endpoint
POST /api/chat
Request Body:
{
  "conversation": [
    { "role": "user", "text": "Halo Gemini" }
  ]
}
Response:
{
  "result": "Halo! Ada yang bisa saya bantu?"
}
🧠 Tech Stack

Node.js

Express.js

GoogleGenAI SDK

Vanilla JavaScript

CSS Flexbox UI

📚 What I Learned

Cara kerja REST API

Menggunakan Gemini API

Mengontrol output AI (temperature, systemInstruction)

CORS configuration

Secure API key management

Frontend–Backend communication

Async/Await fetch integration

💡 Future Improvements

 Chat history persistence

 Authentication

 Streaming response

 Dark mode

 Typing animation

 Deploy ke Vercel / Render

📸 Preview

Tambahkan screenshot di sini nanti.

📄 License

This project is for educational purposes.
