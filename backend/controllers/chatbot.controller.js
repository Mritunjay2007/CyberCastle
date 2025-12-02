exports.chat = async (req, res) => {
  try {
    console.log("✅ CHAT ROUTE HIT");
    console.log("BODY:", req.body);

    const { message } = req.body;

    if (!message || message.length > 500) {
      return res.status(400).json({ error: "Message too long" });
    }

    const aiReply = `You asked about: ${message}`;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "AI service failed" });
  }
};
