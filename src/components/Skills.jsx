import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  // Find active category item
  const selectedCategory = skillCategories.find((cat) => cat.id === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const barVariants = (targetLevel) => ({
    hidden: { width: '0%', opacity: 0 },
    visible: { 
      width: `${targetLevel}%`, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-dark-lighter/50">
      {/* Visual glowing meshes */}
      <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            My <span className="text-primary text-glow-cyan">Skills</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">TECHNICAL BLOCKCHAIN & FRONTEND EXPERTISE</p>
        </div>

        {/* Category Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setActiveCategory(category.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary/10 via-[#0B0F19]/40 to-secondary/10 border-primary shadow-[0_0_20px_rgba(0,242,254,0.15)]' 
                    : 'glassmorphism hover:border-gray-700/80 border-white/5'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${
                    isActive ? 'bg-primary/20 text-primary' : 'bg-[#111827] text-gray-400'
                  } text-2xl transition-colors duration-300`}>
                    <Icon className={isActive ? 'animate-pulse' : ''} />
                  </div>
                  <h3 className={`font-bold text-base md:text-lg transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-white'
                  }`}>
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Category Skill Sliders Panel */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glassmorphism p-6 md:p-10 rounded-3xl border-white/5 shadow-2xl relative"
        >
          {/* Header */}
          <div className="mb-8 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold text-white tracking-wide">
              {selectedCategory.title} Proficiency Details
            </h3>
            <p className="text-[#A855F7] text-xs font-mono tracking-wider uppercase mt-1">Verified stack metrics</p>
          </div>

          {/* Skill lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {selectedCategory.skills.map((skill) => {
              const SkillIcon = skill.icon;
              return (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2.5 text-gray-200 font-medium">
                      <span className="text-lg text-primary/80"><SkillIcon /></span>
                      {skill.name}
                    </span>
                    <span className="font-mono text-primary font-bold">{skill.level}%</span>
                  </div>
                  
                  {/* Slider bar */}
                  <div className="w-full bg-[#111827] h-2 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                      variants={barVariants(skill.level)}
                      className="h-full bg-gradient-to-r from-primary to-primary-purple rounded-full shadow-[0_0_8px_rgba(0,242,254,0.4)]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-3 right-4 text-[10px] text-gray-600 font-mono italic">
            SECURE LEDGER INTEGRATED
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
