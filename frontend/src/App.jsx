import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Banner from "./Banner";
import AwarenessSection from "./components/AwarenessSection";
import WhyLearnSection from "./components/WhyLearnSection";

import FlashcardTopics from './components/FlashcardTopics';
import TopicPage from "./pages/TopicPage";
import TopicsListPage from "./pages/TopicsListPage"; // NEW: Add this import
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Main home page */}
        <Route path="/" element={
          <>
            <Banner />
            <AwarenessSection />
            <WhyLearnSection />

            <FlashcardTopics />
            {/* Other page content goes here */}
          </>
        } />
        
        {/* All topics listing page */}
        <Route path="/topics" element={<TopicsListPage />} />
        
        {/* Topic page with content + flashcards + quiz */}
        <Route path="/topic/:topicId" element={<TopicPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
