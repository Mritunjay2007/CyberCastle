import React from "react";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaBug, FaUserSecret } from "react-icons/fa";

const AwarenessSection = () => {
  const threats = [
    {
      title: "Phishing Attacks",
      desc: "Fake emails and websites that steal your passwords and banking details.",
      icon: <FaEnvelopeOpenText />,
      color: "text-cyan-400"
    },
    {
      title: "Malware & Ransomware",
      desc: "Malicious software that damages systems or locks your data for ransom.",
      icon: <FaBug />,
      color: "text-purple-400"
    },
    {
      title: "Social Engineering",
      desc: "Psychological tricks hackers use to manipulate people into giving access.",
      icon: <FaUserSecret />,
      color: "text-indigo-400"
    }
  ];

  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff10_1px,transparent_0)] bg-[size:40px_40px] opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Cyber Threat Awareness
        </motion.h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          Learn about the most common cyber threats used by attackers today and
          how to stay protected.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {threats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg hover:scale-105 transition-transform"
            >
              <div className={`text-5xl mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwarenessSection;
