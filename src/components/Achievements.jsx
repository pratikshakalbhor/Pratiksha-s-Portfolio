import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaLaptopCode, FaDatabase } from 'react-icons/fa';
import { SiSolidity } from 'react-icons/si';

const achievementsList = [
  {
    id: 1,
    title: 'Samsung Innovation Campus Graduate',
    icon: FaDatabase,
    date: '2025',
    bullets: [
      'Successfully completed intensive, certified bootcamp in Data Analytics and Algorithms.',
      'Designed a multi-table SQL query system optimization resolving database lag by 40%.',
      'Engineered localized predictive intelligence scripts using core C/C++ structures.'
    ],
    color: '#00F2FE' // Primary Cyan
  },
  {
    id: 2,
    title: 'Web3 University Hackathon Runner-Up',
    icon: FaLaptopCode,
    date: '2025',
    bullets: [
      'Built a decentralized, verifiable voting protocol using Solidity within a 36-hour sprint.',
      'Pioneered instant client-side rendering connecting Metamask wallets in under 2 seconds.',
      'Recognized for exceptional contract gas efficiency and UI cleanliness.'
    ],
    color: '#7928CA' // Secondary Purple
  },
  {
    id: 3,
    title: '15+ Solidity Smart Contracts Deployed',
    icon: SiSolidity,
    date: '2024 - 2025',
    bullets: [
      'Constructed secure multi-sigs, escrow lockers, staking protocols, and NFT collections.',
      'Conducted security audits looking for reentrancy, overflow, and denial-of-service vulnerabilities.',
      'Achieved a zero-critical-issue rating across mock stress-tests in Hardhat environments.'
    ],
    color: '#FF0080' // Neon Accent Pink
  },
  {
    id: 4,
    title: 'Academic Blockchain Pioneer Scholar',
    icon: FaAward,
    date: '2025 - Present',
    bullets: [
      'Leading peer research on Savitribai Phule University consensus algorithm benchmarks.',
      'Mentoring 15+ student peers in setting up local Hardhat nodes and compiling scripts.',
      'Top-tier marks in academic examinations focusing on cryptographic fundamentals.'
    ],
    color: '#0052FF' // Coinbase Blue
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-dark-lighter/50">
      {/* Visual background lights */}
      <div className="absolute top-[20%] right-[10%] w-[320px] h-[320px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[330px] h-[330px] bg-secondary/5 rounded-full blur-[85px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Achievements
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">ECOSYSTEM CONTRIBUTIONS & HONORS</p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievementsList.map((ach, idx) => {
            const Icon = ach.icon;
            
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 90, damping: 15, delay: idx * 0.15 }}
                className="glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl glassmorphism-hover flex gap-6 items-start"
              >
                {/* Neon Icon Container */}
                <div 
                  className="p-4 rounded-2xl flex-shrink-0 text-2xl"
                  style={{ 
                    backgroundColor: `${ach.color}15`, 
                    color: ach.color,
                    border: `1px solid ${ach.color}35`,
                    boxShadow: `0 0 15px ${ach.color}20` 
                  }}
                >
                  <Icon />
                </div>

                {/* Details List */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {ach.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase flex-shrink-0">
                      {ach.date}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {ach.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-gray-400 text-xs md:text-sm leading-relaxed flex items-start gap-2.5">
                        <span className="text-primary mt-1 text-[10px]" style={{ color: ach.color }}>▶</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
