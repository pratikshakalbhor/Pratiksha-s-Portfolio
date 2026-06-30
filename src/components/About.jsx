import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBullseye, FaUserAstronaut } from 'react-icons/fa6';

const About = () => {
  const [activeTab, setActiveTab] = useState('bio');

  const stats = [
    { label: 'Blockchain Candidate', value: 'BSc SPPU' },
    { label: 'Smart Contracts Deployed', value: '15+' },
    { label: 'Hackathons Participated', value: '4+' },
  ];

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
              <FaUserAstronaut className="text-primary text-glow-cyan" /> Biography
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              I am currently pursuing my first year of a specialized <strong>BSc in Blockchain Technology</strong> at Savitribai Phule Pune University. I am deeply fascinated by how decentralization and trustless protocols can reshape global finance, governance, and supply chains.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Alongside core cryptography and ledger mechanics, I specialize in scripting smart contract logic using Solidity and coding highly responsive front-end user portals in React. I am continuously exploring secure tokenomics, zero-knowledge proofs, and database optimizations using SQL.
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
              <FaGraduationCap className="text-primary text-glow-cyan" /> Academic Journey
            </h3>
            <div className="border-l-2 border-primary/20 pl-4 space-y-4">
              <div>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">2025 - 2028 (Expected)</span>
                <h4 className="text-base font-bold text-white mt-1.5">Bachelor of Science in Blockchain</h4>
                <p className="text-gray-400 text-xs mt-0.5">Savitribai Phule Pune University • Pune, MH</p>
                <p className="text-gray-500 text-xs mt-2 font-mono leading-relaxed">
                  Key Coursework: Cryptographic Hash Functions, Distributed Concensus Models, Solidity Smart Contracts, Database Management Systems (SQL), Algorithms & Optimization.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono text-[#7928CA] bg-[#7928CA]/10 px-2.5 py-0.5 rounded-full">Completed 2024</span>
                <h4 className="text-base font-bold text-white mt-1.5">Higher Secondary Education</h4>
                <p className="text-gray-400 text-xs mt-0.5">Science Division (C/C++, Physics, Mathematics)</p>
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
              <FaBullseye className="text-primary text-glow-cyan" /> Career Objective
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              My immediate objective is to leverage my academic knowledge of blockchain architectures, combined with practical skills in Solidity smart contracts, Hardhat ecosystems, and React JS dashboards, to secure a challenging internship or junior developer role in Web3.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              I seek to contribute to open-source protocols that prioritize scalability, accessibility, and robust security audit standards, paving the way for next-generation decentralized ecosystems.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            About <span className="text-primary text-glow-cyan">Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">INTRODUCING THE DEVELOPER</p>
        </div>

        {/* Card and Stats layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Profile Picture & Profile Statistics */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden group mb-8"
            >
              {/* Outer glowing borders */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary-purple to-secondary opacity-60 rounded-2xl p-[3px]">
                <div className="absolute inset-0 bg-dark rounded-2xl overflow-hidden">
                  {/* Real Image of Pratiksha or high-quality placeholder */}
                  <img 
                    src="/images/profile.png" 
                    alt="Pratiksha Kalbhor" 
                    className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Fallback if local image fails
                      e.target.src = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  
                  {/* Blue neon screen shade filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-70" />
                </div>
              </div>
              
              {/* Decorative float elements inside photo card */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-[#0B0F19]/80 border border-white/5 p-2 rounded-lg backdrop-blur">
                <span className="text-primary font-bold">SPPU BSC BLOCKCHAIN</span>
                <span className="text-gray-400">P. KALBHOR</span>
              </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="w-full grid grid-cols-3 gap-3 md:gap-4 max-w-md">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glassmorphism p-3 rounded-xl text-center border-white/5 flex flex-col justify-center min-h-[90px]"
                >
                  <span className="text-lg md:text-xl font-bold text-white gradient-text inline-block">{stat.value}</span>
                  <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase mt-1 leading-snug">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Tab Selector & Tab View Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {/* Tabs Controller */}
            <div className="flex border-b border-dark-border gap-2 mb-8">
              {[
                { id: 'bio', label: 'Biography' },
                { id: 'education', label: 'Education' },
                { id: 'objective', label: 'Objective' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 font-mono text-sm tracking-wider transition-colors duration-300 relative uppercase font-semibold ${
                    activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_5px_#00F2FE]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="glassmorphism p-6 md:p-8 rounded-2xl border-white/5 min-h-[250px] shadow-lg shadow-black/25 flex flex-col justify-center">
              {renderTabContent()}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
