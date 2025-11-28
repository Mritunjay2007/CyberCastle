import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

function FlashcardDeck({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  // reset flip whenever card changes
  useEffect(() => {
    setFlipped(false);
  }, [currentIndex, cards]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20">
      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <Flashcard flashcard={currentCard} flipped={flipped} setFlipped={setFlipped} />

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={goPrev}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-gray-100 font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          ← Previous
        </button>
        <button
          onClick={goNext}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Next →
        </button>
      </div>

      {/* Counter */}
      <p className="text-center mt-4 text-gray-300 font-medium">
        Card {currentIndex + 1} of {cards.length}
      </p>
    </div>
  );
}

export default FlashcardDeck;
