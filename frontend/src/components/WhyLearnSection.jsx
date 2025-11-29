import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaBrain, FaChartLine, FaUserGraduate } from "react-icons/fa";

const WhyLearnSection = () => {
  const features = [
    {
      title: "Beginner to Advanced",
      desc: "Step-by-step learning from basic concepts to professional security skills.",
      icon: <FaBrain />,
      color: "text-cyan-400"
    },
    {
      title: "Hands-on Learning",
      desc: "Quizzes, flashcards, and real-world examples to build practical skills.",
      icon: <FaUserGraduate />,
      color: "text-purple-400"
    },
    {
      title: "Career Growth",
      desc: "Cybersecurity is one of the fastest growing tech career fields worldwide.",
      icon: <FaChartLine />,
      color: "text-indigo-400"
    },
    {
      title: "Digital Safety First",
      desc: "Learn to protect yourself, your data, and your online identity.",
      icon: <FaShieldAlt />,
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#050816] to-[#0b0f2a]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Why Learn Cybersecurity With Us?
        </motion.h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          We make cybersecurity simple, practical, and accessible for everyone —
          students, professionals, and beginners alike.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg hover:scale-105 transition-transform"
            >
              <div className={`text-5xl mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <a
            href="/topics"
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            Start Your Cybersecurity Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLearnSection;
