import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { projectsList } from '../data/projects';
import { AnimatedTitle } from '../pages/Home';

// Map IDs to specific category badges with icons
const getCategoryBadge = (id) => {
  switch (id) {
    case 'dataproof':
      return '📄 Document Verification';
    case 'freelancechain':
      return '💼 Freelancing Platform';
    case 'nft-dapp':
      return '🖼 NFT Marketplace';
    case 'ecochain':
      return '🌱 Sustainability Tracker';
    default:
      return '💻 Web3 Project';
  }
};

// Extract only domain name for cleaner address bar preview
const getDomain = (url) => {
  if (!url) return '';
  return url.replace('https://', '').replace('http://', '').split('/')[0];
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const scrollContainerRef = useRef(null);

  // Filter out academic and under-development projects (completed ones only)
  const displayProjects = projectsList.filter(
    (project) => !project.academic && !project.underDevelopment
  );

  // Intersection Observer to run keyboard events only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    const element = document.getElementById('projects');
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // RequestAnimationFrame based smooth infinite marquee scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isHovered || selectedProject !== null) return;

    let animId;
    const speed = 0.55; // optimized smooth marquee speed

    const step = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, selectedProject]);

  const handleScrollPrev = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDist = window.innerWidth < 768 ? 320 : 432;
      container.scrollBy({
        left: -scrollDist,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollNext = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDist = window.innerWidth < 768 ? 320 : 432;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({
          left: scrollDist,
          behavior: 'smooth',
        });
      }
    }
  };

  // Keyboard navigation listeners (when section in viewport)
  useEffect(() => {
    if (!isInView || selectedProject !== null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleScrollPrev();
      } else if (e.key === 'ArrowRight') {
        handleScrollNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInView, selectedProject]);

  // Disable main body scroll when detailed popup overlay is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 relative overflow-hidden bg-[#080B11] w-full"
    >
      {/* Premium custom glows, scrollbar hides and animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.35; scale: 1; }
          50% { opacity: 1; scale: 1.15; }
        }
        .live-dot-pulse {
          position: relative;
        }
        .live-dot-pulse::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 6px #10B981;
          animation: subtlePulse 2s infinite ease-in-out;
        }
        @keyframes hoverBorderGlow {
          0%, 100% { border-color: rgba(255, 255, 255, 0.05); }
          50% { border-color: rgba(0, 242, 254, 0.35); }
        }
        .card-premium-glow:hover {
          animation: hoverBorderGlow 3s infinite ease-in-out;
          box-shadow: 0 12px 40px rgba(0, 242, 254, 0.08), 0 0 1px rgba(0, 242, 254, 0.25);
        }
      `}} />

      {/* Orbit background lights */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedTitle
          text="Featured Projects"
          subtext="Discover my highlighted blockchain & Web3 projects built using modern protocols."
        />
      </div>

      {/* Horizontal Carousel Area */}
      <div
        className="relative w-full mt-12 py-8 cursor-default group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation arrow overlays */}
        <button
          onClick={handleScrollPrev}
          className="absolute left-2 md:left-6 top-[40%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur shadow-lg hover:bg-black/75"
          title="Scroll Left (←)"
          aria-label="Scroll left"
        >
          <FaChevronLeft size={16} />
        </button>

        <button
          onClick={handleScrollNext}
          className="absolute right-2 md:right-6 top-[40%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur shadow-lg hover:bg-black/75"
          title="Scroll Right (→)"
          aria-label="Scroll right"
        >
          <FaChevronRight size={16} />
        </button>

        {/* Outer track borders gradient blend */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-28 bg-gradient-to-r from-[#080B11] to-transparent z-25 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-28 bg-gradient-to-l from-[#080B11] to-transparent z-25 pointer-events-none" />

        {/* Scrollable track containing layout elements */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto w-full gap-8 py-4 px-12 md:px-24 scrollbar-none z-10 relative scroll-smooth"
        >
          {/* Double list map to enable endless scrolling loop */}
          {[...displayProjects, ...displayProjects].map((project, idx) => {
            const projectKey = `${project.id}-${idx}`;

            return (
              <div key={projectKey} className="w-[300px] sm:w-[350px] md:w-[400px] shrink-0">
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  perspective={1000}
                  scale={1.01}
                  transitionSpeed={800}
                  className="w-full h-full"
                >
                  <div
                    className="group/card relative glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:-translate-y-2.5 transition-all duration-350 flex flex-col h-[460px] bg-[#0c101b]/45 card-premium-glow"
                  >
                    {/* Project Live browser-frame preview (enlarged height: 260px) */}
                    {project.demo ? (
                      <div className="h-[260px] w-full flex flex-col rounded-t-xl bg-[#0c101b]/80 border-b border-white/10 overflow-hidden group/browser relative">
                        {/* Browser Header Bar */}
                        <div className="h-9 w-full bg-white/[0.03] backdrop-blur-md border-b border-white/5 flex items-center px-4 justify-between select-none shrink-0 relative z-20">
                          {/* macOS style Window Controls */}
                          <div className="flex gap-1.5 items-center w-16">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          </div>

                          {/* Address Bar */}
                          <div className="text-[9px] font-mono text-gray-500 bg-[#080B11]/60 px-3.5 py-0.5 rounded border border-white/5 truncate max-w-[50%] flex items-center justify-center">
                            <span className="truncate">{getDomain(project.demo)}</span>
                          </div>

                          {/* Live Preview Badge with Online Indicator */}
                          <div className="w-24 flex justify-end items-center pr-1 pl-3">
                            <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 flex items-center gap-1.5 select-none pl-5 relative">
                              <span className="live-dot-pulse" />
                              LIVE
                            </span>
                          </div>
                        </div>

                        {/* Browser Content */}
                        <div className="flex-1 w-full bg-[#080B11] relative overflow-hidden">
                          <iframe
                            src={project.demo}
                            title={`${project.title} live demo`}
                            className="w-full h-full border-none pointer-events-none scale-100 group-hover/card:scale-[1.03] transition-transform duration-500 origin-top overflow-hidden scrollbar-none"
                            style={{ 
                              backgroundColor: '#080B11',
                              scrollbarWidth: 'none',
                              msOverflowStyle: 'none'
                            }}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                            scrolling="no"
                          />
                          
                          {/* Center Glassmorphism Action Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-[2px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className="px-4 py-2 rounded-full glassmorphism border border-white/20 text-white font-mono text-[9px] font-bold tracking-wider hover:bg-white/10 hover:border-[#00F2FE]/50 hover:text-[#00F2FE] hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all flex items-center gap-1.5 shadow-xl"
                            >
                              <span>👁</span> PREVIEW PROJECT
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[260px] w-full flex flex-col rounded-t-xl bg-[#0c101b]/80 border-b border-white/10 overflow-hidden relative">
                        {/* Empty placeholder header */}
                        <div className="h-9 w-full bg-white/[0.03] border-b border-white/5 flex items-center px-4 justify-between select-none shrink-0 relative z-20">
                          <div className="flex gap-1.5 items-center w-16">
                            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          </div>
                          <div className="text-[9px] font-mono text-gray-500 bg-[#080B11]/60 px-3 py-0.5 rounded border border-white/5">
                            localhost:3000
                          </div>
                          <div className="w-20" />
                        </div>
                        
                        <div className="flex-1 w-full flex flex-col items-center justify-center bg-black/40 text-gray-500 select-none">
                          <span className="text-[9px] font-mono tracking-widest text-[#a855f7] mb-1.5 uppercase font-bold">Live Demo</span>
                          <span className="text-xs font-mono font-bold tracking-wider text-gray-400">Coming Soon</span>
                        </div>
                      </div>
                    )}

                    {/* Card details body (equal height spacer align) */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Project Category Badge */}
                        <div className="mb-3">
                          <span className="text-[9px] font-bold tracking-wider text-[#00F2FE] bg-[#00F2FE]/5 px-2 py-0.5 rounded border border-[#00F2FE]/25 font-mono">
                            {getCategoryBadge(project.id)}
                          </span>
                        </div>

                        {/* Title and Header */}
                        <h3 className="text-base font-bold text-white mb-2 leading-tight tracking-wide group-hover/card:text-[#00F2FE] transition-colors duration-300 select-none">
                          {project.title}
                        </h3>

                        {/* One-Line Overview */}
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 select-none whitespace-nowrap overflow-hidden text-ellipsis">
                          {project.overview}
                        </p>
                      </div>

                      {/* Align buttons perfectly in the bottom wrapper */}
                      <div className="mt-auto">
                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#080B11]/80 text-[#a855f7] border border-white/5 select-none"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#080B11]/80 text-gray-400 border border-white/5 select-none">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Action Redirection Buttons */}
                        <div className="flex gap-2.5 pt-3 border-t border-white/[0.05]">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 px-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#00F2FE] transition-all text-center text-white font-mono text-[10px] flex items-center justify-center gap-1.5"
                          >
                            <FaGithub size={12} />
                            GitHub
                          </a>

                          {project.demo ? (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#7928CA] text-[#080B11] font-bold font-mono text-[10px] hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                            >
                              <FaExternalLinkAlt size={10} />
                              Live Demo
                            </a>
                          ) : (
                            <span className="flex-1 py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-600 font-mono text-[10px] flex items-center justify-center gap-1.5 cursor-not-allowed select-none">
                              No Demo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portal modal for detailed preview overlays */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 overflow-hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/85 backdrop-blur-md"
                  onClick={() => setSelectedProject(null)}
                />

                {/* Modal box container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="relative glassmorphism max-w-5xl w-full rounded-2xl border border-white/10 overflow-hidden text-white z-10 shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[550px] bg-[#0c101b]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left Column (55%): Real embedded iframe */}
                  <div className="w-full md:w-[55%] h-[240px] md:h-full relative border-b md:border-b-0 md:border-r border-white/5 bg-[#080B11]">
                    {selectedProject.demo ? (
                      <iframe
                        src={selectedProject.demo}
                        title={`${selectedProject.title} modal demo`}
                        className="w-full h-full border-none pointer-events-auto"
                        style={{ backgroundColor: '#080B11' }}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <span className="text-[10px] font-mono tracking-widest text-[#a855f7] mb-1.5 uppercase font-bold">Live Demo</span>
                        <span className="text-xs font-mono font-bold tracking-wider text-gray-400">Coming Soon</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column (45%): Body details */}
                  <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[calc(85vh-240px)] md:h-full bg-[#0c101b] relative scrollbar-none">
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 hover:border-red-400 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Close Preview"
                    >
                      <FaTimes size={12} />
                    </button>

                    <div className="flex-1">
                      {/* Badge and Title */}
                      <div className="mb-2.5">
                        <span className="text-[9px] font-bold tracking-wider text-[#00F2FE] bg-[#00F2FE]/5 px-2 py-0.5 rounded border border-[#00F2FE]/25 font-mono">
                          {getCategoryBadge(selectedProject.id)}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight tracking-wide">
                        {selectedProject.title}
                      </h3>
                      
                      <div className="h-[2px] w-12 bg-primary rounded mb-4" />
                      
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                        {selectedProject.overview}
                      </p>

                      {/* Key features list */}
                      {selectedProject.features?.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-[10px] font-mono font-bold tracking-wider text-[#00F2FE] uppercase mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                            Key Features
                          </h4>
                          <ul className="space-y-1.5">
                            {selectedProject.features.map((feat, i) => (
                              <li key={i} className="text-gray-300 text-xs flex items-start gap-2 leading-relaxed">
                                <span className="text-[#a855f7] font-semibold mt-0.5">▸</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Tech stack */}
                      <div className="mb-5">
                        <h4 className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#080B11] text-[#a855f7] border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Redirect actions */}
                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#00F2FE] transition-all text-center text-white font-mono text-xs flex items-center justify-center gap-2"
                        >
                          <FaGithub size={14} />
                          GitHub
                        </a>

                        {selectedProject.demo ? (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#7928CA] text-[#080B11] font-bold font-mono text-xs hover:brightness-110 transition-all text-center flex items-center justify-center gap-2"
                          >
                            <FaExternalLinkAlt size={11} />
                            Live Demo
                          </a>
                        ) : (
                          <span className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-600 font-mono text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none">
                            No Demo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Projects;
