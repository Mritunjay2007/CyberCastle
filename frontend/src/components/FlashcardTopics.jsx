import React, { useState } from "react";
import { flashcardsData } from "../data/flashcards";
import FlashcardDeck from "./Flashcards/FlashcardDeck";

function FlashcardTopics() {
  const [selectedTopic, setSelectedTopic] = useState("All");

  const topics = ["All", ...new Set(flashcardsData.map((card) => card.topic))];

  const filteredCards =
    selectedTopic === "All"
      ? flashcardsData
      : flashcardsData.filter((card) => card.topic === selectedTopic);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4">
            Flashcard Learning
          </h1>
          <p className="text-lg text-gray-300">
            Flip through interactive flashcards organized by topic.
          </p>
        </div>

        {/* Topic filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md " +
                (selectedTopic === topic
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-purple-500/30"
                  : "bg-white/10 text-gray-200 hover:bg-white/20")
              }
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Deck */}
        {filteredCards.length > 0 ? (
          <FlashcardDeck cards={filteredCards} />
        ) : (
          <div className="text-center py-20 text-gray-400 text-xl">
            No flashcards for this topic yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardTopics;
