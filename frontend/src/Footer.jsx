import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f2a] text-gray-300 py-10 mt-20 border-t border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand / Logo */}
        <div className="flex flex-col space-y-3">
          <div className="text-2xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
            TheCyberCastle
          </div>
          <p className="text-gray-400 text-sm">
            Learn cybersecurity, protect your data, and build safer online habits.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <a href="#home" className="hover:text-cyan-400 transition-colors duration-200">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors duration-200">About</a>
          <a href="/flashcards" className="hover:text-cyan-400 transition-colors duration-200">Flashcards</a>
          <a href="/topics" className="hover:text-cyan-400 transition-colors duration-200">Topics</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors duration-200">Contact</a>
        </div>

        {/* Newsletter / Social */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
          <p className="text-gray-400 text-sm">
            Subscribe for cybersecurity tips & updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-l-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-r-full hover:opacity-90 transition-all">
              Subscribe
            </button>
          </div>

          <div className="flex space-x-4 mt-2">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 text-xl transition-all">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 text-xl transition-all">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 text-xl transition-all">
              <FaTwitter />
            </a>
            <a href="mailto:youremail@example.com" className="hover:text-green-400 text-xl transition-all">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} TheCyberCastle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
