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
      {/* 8. Background: Subtle moving glow orbs */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[95px] pointer-events-none"
        animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[85px] pointer-events-none"
        animate={{ y: [0, 25, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2
            id="experience-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block cursor-default"
          >
            Learning <span className="text-primary text-glow-cyan">Journey</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-6 tracking-widest font-mono">ACADEMICS · PROJECTS · BOOTCAMPS</p>
        </div>

        {/* Timeline Layout */}
        <div className="relative md:ml-6 pl-6 md:pl-10 space-y-12">
          {/* Static timeline line track */}
          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/5 pointer-events-none" aria-hidden="true" />

          {/* 1. Timeline Animation: Glowing cyan/purple progress line filling top-to-bottom once */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary-purple to-transparent pointer-events-none shadow-[0_0_12px_#00F2FE]"
            style={{ filter: 'drop-shadow(0 0 6px #00F2FE)' }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {experienceList.map((exp, idx) => {
            const cfg = typeConfig[exp.type] || typeConfig.academic;
            const TypeIcon = cfg.icon;

            return (
              <motion.div
                key={exp.id}
                // 3. Cards reveal animation: Stagger delay bottom-to-top, fade + translateY(40 -> 0)
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: (experienceList.length - 1 - idx) * 0.15 }}
                className="relative"
              >
                {/* 2. Timeline Dots: Scale 0.7 -> 1, gently pulse, with icon rotation on hover */}
                <motion.div
                  className="absolute -left-[38px] md:-left-[47px] top-3.5 flex items-center justify-center z-20"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (experienceList.length - 1 - idx) * 0.15 + 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                  aria-hidden="true"
                >
                  {/* Outer pulsing neon ring */}
                  <motion.div
                    className="absolute w-8 h-8 rounded-full pointer-events-none"
                    style={{
                      backgroundColor: `${cfg.color}15`,
                      border: `1px solid ${cfg.color}40`,
                      boxShadow: `0 0 15px ${cfg.color}20`
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.3 }}
                  />
                  {/* Inner dot containing the type icon */}
                  <motion.div
                    className="w-6 h-6 rounded-full relative z-10 flex items-center justify-center text-white cursor-pointer"
                    style={{
                      backgroundColor: cfg.color,
                      boxShadow: `0 0 10px ${cfg.color}80`
                    }}
                    // 7. Icon Rotation & Glow on hover
                    whileHover={{ rotate: 10, scale: 1.15, boxShadow: `0 0 16px ${cfg.color}bf` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <TypeIcon className="text-[10px]" />
                  </motion.div>
                </motion.div>

                {/* 4. Card Container: Lift, cyan border glow, shadow increase, smooth transition */}
                <motion.div
                  className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl transition-all duration-300 cursor-default"
                  whileHover={{
                    y: -6,
                    borderColor: `${cfg.color}40`,
                    boxShadow: `0 0 25px ${cfg.color}20, 0 12px 36px rgba(0,0,0,0.4)`
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      {/* 5. Badge Animation: Soft glow and scale on hover */}
                      <motion.span
                        className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider"
                        style={{
                          backgroundColor: `${cfg.color}15`,
                          color: cfg.color,
                          border: `1px solid ${cfg.color}30`,
                          boxShadow: `0 0 10px ${cfg.color}10`
                        }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 12px ${cfg.color}35` }}
                        transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                      >
                        {cfg.label}
                      </motion.span>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">{exp.role}</h3>
                      <p className="text-primary font-mono text-xs md:text-sm font-semibold mt-0.5">{exp.company}</p>
                    </div>

                    {/* 6. Date Badge: Subtle floating animation */}
                    <motion.span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-dark border border-white/5 text-gray-300 w-fit flex-shrink-0"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + idx * 0.4,
                        ease: 'easeInOut'
                      }}
                    >
                      <FaCalendarAlt className="text-secondary" aria-hidden="true" /> {exp.duration}
                    </motion.span>
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
