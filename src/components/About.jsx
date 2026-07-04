import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBullseye, FaCircleUser } from 'react-icons/fa6';

const About = () => {
  const [activeTab, setActiveTab] = useState('bio');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bio':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaCircleUser className="text-primary text-glow-cyan" aria-hidden="true" /> Biography
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              I am a <strong>B.Sc Blockchain Technology</strong> student at Savitribai Phule Pune University with a strong passion for blockchain and Web3. I build decentralized projects using <strong>Solidity, React, and JavaScript</strong>, and I am currently focusing on learning full-stack blockchain development.
            </p>
          </motion.div>
        );
      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaGraduationCap className="text-primary text-glow-cyan" aria-hidden="true" /> Academic Journey
            </h3>
            <div className="border-l-2 border-primary/20 pl-4 space-y-4">
              <div>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">2025 – 2028 (Expected)</span>
                <h4 className="text-base font-bold text-white mt-1.5">Bachelor of Science in Blockchain Technology</h4>
                <p className="text-gray-400 text-xs mt-0.5">Savitribai Phule Pune University · Pune, Maharashtra</p>
                <div className="mt-4">
                  <h5 className="text-xs font-mono text-primary uppercase tracking-wider mb-2 font-semibold">Relevant Coursework</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-400 font-mono" role="list">
                    <li className="flex items-center gap-1.5">
                      <span className="text-primary" aria-hidden="true">•</span> Blockchain Technology
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-primary" aria-hidden="true">•</span> Solidity & Smart Contracts
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-primary" aria-hidden="true">•</span> Distributed Systems
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-primary" aria-hidden="true">•</span> SQL & MongoDB
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-primary" aria-hidden="true">•</span> Cloud Computing
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-primary" aria-hidden="true">•</span> Hyperledger Fabric
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'objective':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaBullseye className="text-primary text-glow-cyan" aria-hidden="true" /> Career Objective
            </h3>
            <ul className="space-y-3" role="list">
              <li className="text-gray-400 text-sm md:text-base flex items-start gap-2.5 leading-relaxed">
                <span className="text-primary mt-1.5 flex-shrink-0" aria-hidden="true">▪</span>
                <span>Apply my knowledge of Blockchain, Solidity, React, and JavaScript to build secure and user-friendly Web3 applications.</span>
              </li>
              <li className="text-gray-400 text-sm md:text-base flex items-start gap-2.5 leading-relaxed">
                <span className="text-primary mt-1.5 flex-shrink-0" aria-hidden="true">▪</span>
                <span>Continuously improve my skills in smart contract development and full-stack blockchain technologies.</span>
              </li>
              <li className="text-gray-400 text-sm md:text-base flex items-start gap-2.5 leading-relaxed">
                <span className="text-primary mt-1.5 flex-shrink-0" aria-hidden="true">▪</span>
                <span>Contribute to open-source projects and grow as a Blockchain Developer through real-world experience.</span>
              </li>
            </ul>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 relative overflow-hidden bg-dark">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            About <span className="text-primary text-glow-cyan">Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">INTRODUCING THE DEVELOPER</p>
        </div>

        {/* Card and Stats layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Profile Picture */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.04 }}
              className="relative w-[240px] h-[240px] rounded-full group mb-8 border-4 border-primary shadow-[0_0_20px_rgba(0,242,254,0.45)] overflow-hidden bg-dark flex-shrink-0"
            >
              <img
                src="/images/profile.png"
                alt="Pratiksha Kalbhor — B.Sc Blockchain Technology student"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop';
                }}
              />
            </motion.div>

            {/* Quick Facts */}
            <div className="w-full grid grid-cols-2 gap-3 max-w-xs">
              {[
                { label: 'Degree', value: 'B.Sc Blockchain' },
                { label: 'University', value: 'SPPU, Pune' },
                { label: 'Focus', value: 'Web3 & Smart Contracts' },
                { label: 'Status', value: 'Open to Internships' },
              ].map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glassmorphism p-3 rounded-xl border-white/5 flex flex-col justify-center min-h-[70px]"
                >
                  <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase leading-snug">{fact.label}</span>
                  <span className="text-sm font-semibold text-white mt-0.5 leading-snug">{fact.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {/* Tab Controller */}
            <div className="flex border-b border-dark-border gap-2 mb-8" role="tablist" aria-label="About sections">
              {[
                { id: 'bio', label: 'Biography' },
                { id: 'education', label: 'Education' },
                { id: 'objective', label: 'Objective' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tab-panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 font-mono text-sm tracking-wider transition-colors duration-300 relative uppercase font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t ${activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_5px_#00F2FE]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="glassmorphism p-6 md:p-8 rounded-2xl border-white/5 min-h-[250px] shadow-lg shadow-black/25 flex flex-col justify-center"
            >
              {renderTabContent()}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default About;
