const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.length > 500) {
      return res.status(400).json({ error: "Invalid message" });
    }

    // ✅ v1beta COMPATIBLE MODEL (THIS ONE WORKS)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-001"
    });

    const result = await model.generateContent(message);

    const reply =
      result.response.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ reply: "⚠️ AI service unavailable" });
  }
});

module.exports = router;
