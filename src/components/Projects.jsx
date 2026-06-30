import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { projectsList } from '../data/projects';

const Projects = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dark">
      {/* Light glow elements */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            My <span className="text-primary text-glow-cyan">Projects</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">DAPPS & DECENTRALIZED PROTOCOLS</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projectsList.map((project, index) => {
            const isExpanded = expandedCard === project.id;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 15, delay: index * 0.1 }}
                className="glassmorphism rounded-2xl overflow-hidden border border-white/5 shadow-xl glassmorphism-hover flex flex-col h-full"
              >
                {/* Visual Image Header */}
                <div className="relative h-56 w-full overflow-hidden group">
                  {/* Floating category overlay */}
                  <div className="absolute top-4 left-4 z-20 bg-dark-lighter/85 border border-[#00F2FE]/30 py-1 px-3 rounded-full text-xs font-mono font-bold tracking-wider text-primary">
                    Web3 / Dapp
                  </div>

                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Fallback visual illustration from Unsplash
                      const fallbacks = {
                        freelancechain: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600",
                        "nft-marketplace": "https://images.unsplash.com/photo-1644020961825-ee32c3f56cf8?q=80&w=600",
                        ecochain: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600",
                        cryptovault: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600"
                      };
                      e.target.src = fallbacks[project.id] || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600";
                    }}
                  />
                  
                  {/* Colored tint */}
                  <div className="absolute inset-0 bg-[#080B11]/50 group-hover:bg-[#080B11]/20 transition-all duration-300 pointer-events-none" />
                </div>

                {/* Info and Expand Container */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-3 flex items-center justify-between">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Technical Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-dark border border-white/5 text-[#A855F7] tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    {/* Repository Links */}
                    <div className="flex items-center gap-4">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors duration-300 font-mono text-xs font-semibold flex items-center gap-1.5"
                      >
                        <FaGithub size={16} /> Repository
                      </a>
                      
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:text-white transition-colors duration-300 font-mono text-xs font-semibold flex items-center gap-1.5"
                      >
                        <FaExternalLinkAlt size={13} /> Live Demo
                      </a>
                    </div>

                    {/* Collapse Button */}
                    <button 
                      onClick={() => toggleExpand(project.id)}
                      className="text-gray-400 hover:text-primary transition-colors duration-300 font-mono text-xs flex items-center gap-1 focus:outline-none"
                    >
                      {isExpanded ? (
                        <>Collapse <FaChevronUp size={11} /></>
                      ) : (
                        <>Features <FaChevronDown size={11} /></>
                      )}
                    </button>
                  </div>

                  {/* Smart Contract Features Drawer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-4 border-t border-white/5 space-y-3">
                          <h4 className="text-xs font-mono font-bold tracking-widest text-[#00F2FE] uppercase">
                            Smart Contract Features:
                          </h4>
                          <ul className="space-y-2">
                            {project.features.map((feat, idx) => (
                              <li key={idx} className="text-gray-400 text-xs flex items-start gap-2 leading-relaxed">
                                <span className="text-primary min-w-[12px] mt-0.5">•</span>
                                <div>{feat}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
