import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 3000;

/* =============================
   Setup __dirname untuk ESM
============================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =============================
   Validasi API Key
============================= */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY tidak ditemukan di file .env");
  process.exit(1);
}

/* =============================
   Inisialisasi Gemini
============================= */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-2.5-flash";

/* =============================
   Middleware
============================= */
app.use(cors());
app.use(express.json());

// Serve file static (HTML, CSS, JS) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

/* =============================
   Endpoint Chat
============================= */
app.post("/api/chat", async (req, res) => {
  try {
    const { conversation } = req.body;

    if (!conversation || !Array.isArray(conversation)) {
      return res.status(400).json({
        error: "conversation harus berupa array",
      });
    }

    if (conversation.length === 0) {
      return res.status(400).json({
        error: "conversation tidak boleh kosong",
      });
    }

    const contents = conversation.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.8,
        systemInstruction: "Jawab hanya menggunakan bahasa Indonesia.",
      },
    });

    return res.status(200).json({
      result: response.text,
    });

  } catch (error) {
    console.error("🔥 Error:", error.message);

    return res.status(500).json({
      error: "Terjadi kesalahan pada server",
    });
  }
});

/* =============================
   Start Server
============================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});