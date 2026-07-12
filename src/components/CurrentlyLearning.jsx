import React from 'react';
import { motion } from 'framer-motion';
import { currentlyLearningList } from '../data/learning';

const CurrentlyLearning = () => {
  return (
    <section id="learning" aria-labelledby="learning-heading" className="py-24 relative overflow-hidden bg-dark-lighter/50">
      {/* Glow orbs */}
      <div className="absolute top-[25%] left-[5%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="learning-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Currently <span className="text-primary text-glow-cyan">Learning</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">CONTINUOUS GROWTH · CURRENT FOCUS AREAS</p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentlyLearningList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.08 }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 0 25px ${item.statusColor}1A, 0 8px 32px rgba(0,0,0,0.37)`,
                  borderColor: `${item.statusColor}50`
                }}
                className="group glassmorphism rounded-2xl p-6 border border-white/5 transition-all duration-300 shadow-xl flex flex-col gap-4 cursor-default"
              >
                {/* Icon + Status Row */}
                <div className="flex items-start justify-between">
                  <div
                    className="p-3 rounded-xl text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: `${item.statusColor}15`,
                      color: item.statusColor,
                      border: `1px solid ${item.statusColor}30`,
                    }}
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>

                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: `${item.statusColor}15`,
                      color: item.statusColor,
                      border: `1px solid ${item.statusColor}30`,
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-white tracking-wide">{item.topic}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CurrentlyLearning;

