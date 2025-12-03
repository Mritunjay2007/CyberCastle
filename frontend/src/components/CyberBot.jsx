import React, { useState } from "react";

function CyberBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // ✅ Frontend security limit
    if (input.length > 500) {
      alert("Message too long");
      return;
    }

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", text: data.reply },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ AI service unavailable." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* ✅ Floating Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-400 to-purple-500 text-white p-4 rounded-full shadow-xl hover:scale-105 transition"
      >
        🤖
      </button>

      {/* ✅ Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#0b0f2a] border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-white/10">
            <h3 className="font-bold text-white text-sm">
              🛡️ Cyber AI Assistant
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl hover:text-red-400"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto space-y-2 p-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-blue-600/70 text-right"
                    : "bg-purple-600/70 text-left"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-700 p-2 rounded-lg">
                AI is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-white/10">
            <input
              className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
              placeholder="Ask about cybersecurity..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-sm font-bold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CyberBot;
