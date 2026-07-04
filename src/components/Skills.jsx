import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

const Skills = () => {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 relative overflow-hidden bg-dark-lighter/50"
    >
      {/* Visual glowing meshes */}
      <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="skills-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            My <span className="text-primary text-glow-cyan">Skills</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-6 tracking-widest font-mono">TECHNOLOGIES I WORK WITH</p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-lg" aria-hidden="true">
                    <CategoryIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{category.title}</h3>
                    <p className="text-gray-500 text-xs font-mono mt-0.5">{category.description}</p>
                  </div>
                </div>

                {/* Skill Badge Grid — glowing chips */}
                <div className="flex flex-wrap gap-3" role="list" aria-label={`${category.title} skills`}>
                  {category.skills.map((skill, skillIdx) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        role="listitem"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIdx * 0.05 + skillIdx * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                        whileHover={{
                          y: -5,
                          scale: 1.08,
                          boxShadow: '0 0 18px rgba(0, 242, 254, 0.45)',
                          borderColor: 'rgba(0, 242, 254, 0.6)',
                          transition: { duration: 0.15 }
                        }}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glassmorphism border border-white/8 transition-all duration-300 cursor-default group"
                        style={{ willChange: 'transform, box-shadow' }}
                      >
                        <motion.span
                          className="text-base text-primary/70 group-hover:text-primary transition-colors duration-300"
                          whileHover={{ scale: 1.3, rotate: 5 }}
                          aria-hidden="true"
                        >
                          <SkillIcon />
                        </motion.span>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Divider between categories except last */}
                {catIdx < skillCategories.length - 1 && (
                  <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
