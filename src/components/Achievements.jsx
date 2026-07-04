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
      'Completed certified bootcamp training covering Data Analytics, Algorithms, and C/C++ programming.',
      'Designed relational database tables and wrote analytical queries in SQL.',
    ],
    color: '#00F2FE',
  },
  {
    id: 2,
    title: 'Open Source Contributor',
    icon: FaAward,
    date: '2024',
    bullets: [
      'Contributed minor documentation updates and library fixes for public Web3/React tooling.',
      'Participated in code reviews and discussions in community developer forums.',
    ],
    color: '#7928CA',
  },
  {
    id: 3,
    title: 'Blockchain Projects',
    icon: SiSolidity,
    date: '2024 – Present',
    bullets: [
      'Created Solidity smart contract implementations for token tracking and carbon credit registry.',
      'Designed responsive UI control dashboards integrated with wallet provider interfaces.',
    ],
    color: '#00F2FE',
  },
  {
    id: 4,
    title: 'Hackathon Participant',
    icon: FaLaptopCode,
    date: '2025',
    bullets: [
      'Developed a prototype decentralized application MVP during a campus blockchain development event.',
      'Connected MetaMask provider APIs to supply live blockchain state fields to frontend components.',
    ],
    color: '#7928CA',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="py-24 relative overflow-hidden bg-dark-lighter/50">
      {/* Visual background lights */}
      <div className="absolute top-[20%] right-[10%] w-[320px] h-[320px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[10%] w-[330px] h-[330px] bg-secondary/5 rounded-full blur-[85px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="achievements-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Achievements
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">MILESTONES & CONTRIBUTIONS</p>
        </div>

        {/* Grid */}
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
                {/* Icon */}
                <div
                  className="p-4 rounded-2xl flex-shrink-0 text-2xl"
                  style={{
                    backgroundColor: `${ach.color}15`,
                    color: ach.color,
                    border: `1px solid ${ach.color}35`,
                    boxShadow: `0 0 15px ${ach.color}20`,
                  }}
                  aria-hidden="true"
                >
                  <Icon />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-white tracking-wide">{ach.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase flex-shrink-0">{ach.date}</span>
                  </div>
                  <ul className="space-y-2">
                    {ach.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-gray-400 text-xs md:text-sm leading-relaxed flex items-start gap-2.5">
                        <span className="mt-1 text-[10px] flex-shrink-0" style={{ color: ach.color }} aria-hidden="true">▶</span>
                        {bullet}
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
