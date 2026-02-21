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
   User Profile & System Prompt
============================= */
const USER_PROFILE = {
    name: "Kang Nov",
    role: "Sr Software Engineer",
    expertise: [
        "Backend Development",
        "AI Integration",
        "Clean Architecture",
        "System Design",
        "FullStack Development"
    ],
    goal: "Mengembangkan integrasi AI dalam aplikasi real-world"
};

const SYSTEM_PROMPT = `
Kamu adalah AI Assistant pribadi milik ${USER_PROFILE.name},
seorang ${USER_PROFILE.role}.

Profil pengguna:
- Keahlian: ${USER_PROFILE.expertise.join(", ")}
- Tujuan: ${USER_PROFILE.goal}

Aturan:
- Jawab hanya menggunakan Bahasa Indonesia.
- Gunakan gaya profesional, teknis, dan ringkas.
- Berikan insight yang relevan untuk level senior.
- Jika ditanya "siapa saya", jelaskan berdasarkan profil di atas.
- Fokus pada solusi praktis dan scalable.
`;

/* =============================
   Middleware
============================= */
app.use(cors());
app.use(express.json());
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
        systemInstruction: SYSTEM_PROMPT,
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