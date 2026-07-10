import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsList } from '../data/projects';
import { AnimatedTitle } from '../pages/Home';
import CircularGallery from './CircularGallery';

/* ─── Background decoration ─────────────────────────────────────────────────── */
const BlockchainNetwork = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#00F2FE" stopOpacity="1" />
        <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="10%" cy="20%" r="4" fill="#00F2FE" />
    <circle cx="20%" cy="50%" r="5" fill="#7928CA" />
    <circle cx="15%" cy="80%" r="4" fill="#00F2FE" />
    <circle cx="50%" cy="15%" r="6" fill="#00F2FE" />
    <circle cx="85%" cy="25%" r="4" fill="#7928CA" />
    <circle cx="90%" cy="60%" r="5" fill="#00F2FE" />
    <circle cx="80%" cy="85%" r="6" fill="#7928CA" />
    <line x1="10%" y1="20%" x2="20%" y2="50%" stroke="white" strokeWidth="1" />
    <line x1="20%" y1="50%" x2="15%" y2="80%" stroke="white" strokeWidth="1" />
    <line x1="20%" y1="50%" x2="50%" y2="15%" stroke="white" strokeWidth="1" />
    <line x1="50%" y1="15%" x2="85%" y2="25%" stroke="white" strokeWidth="1" />
    <line x1="85%" y1="25%" x2="90%" y2="60%" stroke="white" strokeWidth="1" />
    <line x1="90%" y1="60%" x2="80%" y2="85%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="15%" y1="80%" x2="80%" y2="85%" stroke="white" strokeWidth="0.5" />
  </svg>
);

/* ─── Detail panel variants ──────────────────────────────────────────────────── */
const panelVariants = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.22, ease: 'easeIn' } },
};

/* ─── Projects data ──────────────────────────────────────────────────────────── */
const ORDER = ['ecochain', 'freelancechain', 'nft-dapp', 'dataproof', 'tokenomics', 'distributed-systems'];

const FALLBACK_IMAGES = {
  tokenomics:           'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=600&auto=format&fit=crop',
  'distributed-systems':'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop',
};

/* ─── Main component ─────────────────────────────────────────────────────────── */
const Projects = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const displayProjects = ORDER
    .map(id => projectsList.find(p => p.id === id))
    .filter(Boolean);

  const galleryItems = displayProjects.map(proj => ({
    image: proj.image || FALLBACK_IMAGES[proj.id] || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
    text:  proj.title,
  }));

  const activeProject = displayProjects[activeIdx] ?? displayProjects[0];

  const handleChange = useCallback((idx) => {
    setActiveIdx(idx);
  }, []);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 relative overflow-hidden bg-[#080B11] w-full"
    >
      {/* ── injected styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gridScroll {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
        .animated-grid {
          background-size: 60px 60px;
          background-image:
            linear-gradient(to right,  rgba(0,242,254,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(121,40,202,0.03) 1px, transparent 1px);
          animation: gridScroll 20s linear infinite;
        }
        .aurora-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          opacity: 0.12;
        }
        @keyframes floatEffect {
          0%,100% { transform: translateY(0)  scale(1);    opacity: 0.3; }
          50%      { transform: translateY(-15px) scale(1.05); opacity: 0.7; }
        }
        .animate-float { animation: floatEffect 6s ease-in-out infinite; }

        /* gallery container hover border */
        .gallery-wrap {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .gallery-wrap:hover {
          border-color: rgba(0,242,254,0.18) !important;
          box-shadow: 0 0 48px rgba(0,242,254,0.12), 0 0 80px rgba(121,40,202,0.1);
        }

        /* detail panel glass card */
        .detail-panel {
          background: rgba(13,20,35,0.52);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .detail-panel:hover {
          border-color: rgba(0,242,254,0.22);
          box-shadow: 0 0 40px rgba(0,242,254,0.1);
        }

        /* tech tag */
        .tech-tag {
          font-size: 10px;
          font-family: 'Fira Code', monospace;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 6px;
          background: rgba(8,11,17,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          color: #a855f7;
          letter-spacing: 0.06em;
        }

        /* ── pulse dot ── */
        .pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00F2FE;
          animation: pulseDot 1.8s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,242,254,0.6); }
          50%      { box-shadow: 0 0 0 5px rgba(0,242,254,0); }
        }
      `}} />

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 animated-grid pointer-events-none" />
      <BlockchainNetwork />
      <div className="aurora-glow bg-[#00F2FE] w-[500px] h-[500px] -top-40 -left-40" />
      <div className="aurora-glow bg-[#7928CA] w-[500px] h-[500px] -bottom-40 -right-40" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute w-2 h-2 rounded-full bg-[#00F2FE] top-[20%] left-[30%] animate-float" style={{ animationDelay: '0s'   }} />
        <div className="absolute w-3 h-3 rounded-full bg-[#7928CA] top-[60%] left-[10%] animate-float" style={{ animationDelay: '2s'   }} />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#00F2FE] top-[80%] left-[45%] animate-float" style={{ animationDelay: '1s'   }} />
        <div className="absolute w-2 h-2 rounded-full bg-[#7928CA] top-[30%] left-[85%] animate-float" style={{ animationDelay: '3.5s' }} />
        <div className="absolute w-3 h-3 rounded-full bg-[#00F2FE] top-[75%] left-[80%] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedTitle
          text="Featured Projects"
          subtext="Explore my highlighted blockchain & Web3 projects through an interactive 3D circular gallery."
        />

        {/* ══════════════════ Main layout ════════════════════ */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 mt-10">

          {/* ─── 3D Circular Gallery ─── */}
          <div
            className="
              gallery-wrap
              w-full lg:w-[55%]
              h-[460px] md:h-[560px]
              relative overflow-hidden
              flex items-center justify-center
              rounded-2xl
              border border-white/5
              bg-[rgba(8,11,17,0.35)]
              shadow-2xl
            "
          >
            <CircularGallery
              items={galleryItems}
              onChange={handleChange}
            />
          </div>

          {/* ─── Detail Panel ─── */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.article
                  key={activeProject.id}
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="detail-panel p-6 md:p-8 min-h-[420px] flex flex-col justify-between shadow-xl"
                >
                  {/* top section */}
                  <div>
                    {/* category pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F2FE] bg-[#00F2FE]/10 px-3 py-1 rounded-full border border-[#00F2FE]/25 select-none">
                        {activeProject.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                        <span className="pulse-dot" />
                        ACTIVE
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="text-2xl md:text-[1.75rem] font-extrabold text-white leading-tight mb-3 tracking-wide">
                      {activeProject.title}
                    </h3>

                    {/* description */}
                    <p className="text-gray-400 text-sm md:text-[0.93rem] leading-relaxed mb-6">
                      {activeProject.overview}
                    </p>

                    {/* key features */}
                    {activeProject.features?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-[10px] font-mono font-bold tracking-widest text-[#00F2FE] uppercase mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {activeProject.features.map((feat, i) => (
                            <li key={i} className="text-gray-300 text-xs md:text-sm flex items-start gap-2.5 leading-relaxed">
                              <span className="text-[#7928CA] font-extrabold mt-0.5 select-none">▸</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* bottom section */}
                  <div>
                    {/* tech stack */}
                    <div className="mb-1">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-2">
                      {activeProject.tags.map(tag => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>

                    {/* action buttons */}
                    <div className="flex gap-3 items-center pt-4 border-t border-white/[0.06]">
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`github-btn-${activeProject.id}`}
                        className="flex-1 py-3 px-4 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#00F2FE] transition-all text-center text-white font-semibold font-mono text-xs flex items-center justify-center gap-2"
                        aria-label={`View ${activeProject.title} on GitHub`}
                      >
                        <FaGithub size={14} />
                        GitHub
                      </a>

                      {activeProject.demo ? (
                        <a
                          href={activeProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`demo-btn-${activeProject.id}`}
                          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#7928CA] text-[#080B11] font-bold font-mono text-xs hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                          aria-label={`View live demo of ${activeProject.title}`}
                        >
                          <FaExternalLinkAlt size={11} />
                          Live Demo
                        </a>
                      ) : (
                        <span className="flex-1 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-600 font-mono text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none">
                          <FaExternalLinkAlt size={11} />
                          No Demo
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>

        </div>{/* end main layout */}
      </div>
    </section>
  );
};

export default Projects;
