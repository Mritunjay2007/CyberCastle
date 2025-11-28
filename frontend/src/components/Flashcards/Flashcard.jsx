import React from "react";

function Flashcard({ flashcard, flipped, setFlipped }) {
  return (
    <div className="relative w-80 h-48 sm:w-96 sm:h-56 perspective-1000 cursor-pointer">
      <div
        onClick={() => setFlipped((prev) => !prev)}
        className={
          "relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d " +
          (flipped ? "rotate-y-180" : "")
        }
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400/30 to-blue-600/40 backdrop-blur-sm text-white rounded-2xl shadow-2xl flex items-center justify-center p-6 text-xl font-semibold backface-hidden border border-white/20">
          <div className="text-center">{flashcard.front}</div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500/90 to-purple-600/90 backdrop-blur-md text-white rounded-2xl shadow-2xl flex items-center justify-center p-6 text-lg font-medium backface-hidden border border-white/30 rotate-y-180">
          <div className="text-center leading-relaxed">{flashcard.back}</div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
