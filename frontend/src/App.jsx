import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import FlashcardTopics from './components/FlashcardTopics';
// Add other page sections as needed

function App() {
  return (
    <div>
      <Header />
      <Banner />
      {/* Other page content goes here */}
      <FlashcardTopics />
    </div>
  );
}

export default App;
