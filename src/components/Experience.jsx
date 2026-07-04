import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaBook, FaCode, FaLaptopCode, FaUser } from 'react-icons/fa';
import { experienceList } from '../data/experience';

const typeConfig = {
  academic: { icon: FaBook, color: '#00F2FE', label: 'Academic' },
  project: { icon: FaCode, color: '#A855F7', label: 'Project' },
  bootcamp: { icon: FaLaptopCode, color: '#05FFCC', label: 'Bootcamp' },
  selflearning: { icon: FaUser, color: '#0052FF', label: 'Self-Learning' },
};

const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 relative overflow-hidden bg-dark">
      {/* Background glow orbs */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2
            id="experience-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Learning <span className="text-primary text-glow-cyan">Journey</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-6 tracking-widest font-mono">ACADEMICS · PROJECTS · BOOTCAMPS</p>
        </div>

        {/* Timeline Layout */}
        <div className="relative md:ml-6 pl-6 md:pl-10 space-y-12">
          {/* Animated timeline line */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary-purple to-transparent pointer-events-none"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {experienceList.map((exp, idx) => {
            const cfg = typeConfig[exp.type] || typeConfig.academic;
            const TypeIcon = cfg.icon;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 90, damping: 15, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Glowing Dot on timeline */}
                <motion.div
                  className="absolute -left-[39px] md:-left-[47px] top-3 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                  aria-hidden="true"
                >
                  {/* Outer pulse ring */}
                  <motion.div
                    className="absolute w-7 h-7 rounded-full"
                    style={{ backgroundColor: `${cfg.color}20`, border: `1px solid ${cfg.color}50` }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.3 }}
                  />
                  {/* Inner dot */}
                  <div
                    className="w-4 h-4 rounded-full relative z-10 flex items-center justify-center"
                    style={{ backgroundColor: cfg.color, boxShadow: `0 0 10px ${cfg.color}80` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  </div>
                </motion.div>

                {/* Card Container */}
                <motion.div
                  className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl transition-all duration-300"
                  whileHover={{ borderColor: `${cfg.color}30`, boxShadow: `0 0 20px ${cfg.color}15` }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <span
                        className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider"
                        style={{ backgroundColor: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30` }}
                      >
                        {cfg.label}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">{exp.role}</h3>
                      <p className="text-primary font-mono text-xs md:text-sm font-semibold mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-dark border border-white/5 text-gray-300 w-fit flex-shrink-0">
                      <FaCalendarAlt className="text-secondary" aria-hidden="true" /> {exp.duration}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{exp.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default Experience;
