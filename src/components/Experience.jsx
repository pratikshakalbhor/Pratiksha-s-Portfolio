import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaStar } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { experienceList } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-dark-lighter/50">
      {/* Background glow orbs */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            My <span className="text-primary text-glow-cyan">Experience</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">MY JOURNEY & MILESTONES</p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-gradient-to-b border-primary/20 md:ml-6 pl-6 md:pl-10 space-y-12">
          
          {/* Vertical axis line overlay gradient color tracker */}
          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary-purple to-transparent pointer-events-none" />

          {experienceList.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 15, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Spinning Ethereum Timeline Node */}
              <div className="absolute -left-[45px] md:-left-[53px] top-1 bg-dark w-10 h-10 rounded-full flex items-center justify-center border border-primary/40 shadow-[0_0_12px_rgba(0,242,254,0.3)] text-primary text-lg">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                >
                  <SiEthereum />
                </motion.div>
              </div>

              {/* Card Container */}
              <div className="glassmorphism p-6 md:p-8 rounded-2xl border-white/5 shadow-xl glassmorphism-hover">
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-mono text-xs md:text-sm font-semibold mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Duration Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-dark border border-white/5 text-gray-300 w-fit">
                    <FaCalendarAlt className="text-secondary" /> {exp.duration}
                  </span>
                </div>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Bullets Highlight Checkpoints */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#00F2FE] uppercase mb-1">
                    Key Highlights:
                  </h4>
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                      <FaStar className="text-secondary/70 mt-1 flex-shrink-0 text-[10px]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
