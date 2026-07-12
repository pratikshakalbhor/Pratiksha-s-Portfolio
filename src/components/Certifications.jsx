import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus, FaSearchMinus, FaUndo } from 'react-icons/fa';
import { certificatesList } from '../data/certificates';

const issuers = {
  'Rise in': '#00F2FE',
  'Udemy': '#00F2FE',
  'Simplilearn': '#00F2FE',
  'default': '#00F2FE',
};

const getIssuerColor = (issuer) => {
  for (const key of Object.keys(issuers)) {
    if (issuer && issuer.toLowerCase().includes(key.toLowerCase())) {
      return issuers[key];
    }
  }
  return issuers.default;
};

const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);

  // Reset zoom and error status on index change
  useEffect(() => {
    setZoom(1);
    setImageError(false);
  }, [selectedIndex]);

  // Auto rotate carousel every 2.5 seconds unless hovered or modal is open
  useEffect(() => {
    if (isHovered || selectedIndex !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === certificatesList.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, selectedIndex]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? certificatesList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === certificatesList.length - 1 ? 0 : prev + 1));
  };

  const handleCarouselPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? certificatesList.length - 1 : prev - 1));
  };

  const handleCarouselNext = () => {
    setActiveIndex((prev) => (prev === certificatesList.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'Escape') {
          setSelectedIndex(null);
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      } else {
        if (e.key === 'ArrowLeft') {
          handleCarouselPrev();
        } else if (e.key === 'ArrowRight') {
          handleCarouselNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const activeCert = selectedIndex !== null ? certificatesList[selectedIndex] : null;

  // Calculates 3D styles based on item position relative to activeIndex
  const getSlideStyle = (index) => {
    let offset = index - activeIndex;
    const N = certificatesList.length;

    // Normalize offset range to [-N/2, N/2]
    while (offset > N / 2) offset -= N;
    while (offset < -N / 2) offset += N;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const xDist = isMobile ? 90 : 280;

    if (offset === 0) {
      return {
        x: 0,
        z: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
        rotateY: 0,
        pointerEvents: 'auto',
      };
    } else if (offset === 1) {
      return {
        x: xDist,
        z: -100,
        scale: 0.8,
        zIndex: 5,
        opacity: 0.6,
        rotateY: -35,
        pointerEvents: 'auto',
      };
    } else if (offset === -1 || (N === 4 && offset === 3)) {
      return {
        x: -xDist,
        z: -100,
        scale: 0.8,
        zIndex: 5,
        opacity: 0.6,
        rotateY: 35,
        pointerEvents: 'auto',
      };
    } else {
      // Hidden in the background
      return {
        x: 0,
        z: -250,
        scale: 0.6,
        zIndex: 0,
        opacity: 0.15,
        rotateY: 0,
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="py-24 relative overflow-hidden bg-dark">
      {/* Background radial glow */}
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[5%] w-[320px] h-[320px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="certificates-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Certifications
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-6 tracking-widest font-mono">CREDENTIAL VERIFICATION MATRIX</p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full max-w-5xl mx-auto h-[360px] md:h-[480px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={handleCarouselPrev}
            className="absolute left-0 md:left-2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur shadow-lg hover:bg-black/60"
            title="Previous Index"
          >
            <FaChevronLeft size={16} />
          </button>
          
          <button
            onClick={handleCarouselNext}
            className="absolute right-0 md:right-2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur shadow-lg hover:bg-black/60"
            title="Next Index"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Perspective Area */}
          <div className="w-full h-full flex items-center justify-center relative [perspective:1200px] [transform-style:preserve-3d]">
            {certificatesList.map((cert, index) => {
              const color = getIssuerColor(cert.issuer);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={cert.id}
                  style={{
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={getSlideStyle(index)}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  className="w-[300px] sm:w-[420px] md:w-[560px] aspect-[4/3] rounded-2xl glassmorphism border border-white/10 p-2.5 overflow-hidden shadow-2xl flex flex-col justify-between cursor-pointer select-none"
                  onClick={() => {
                    if (isActive) {
                      setSelectedIndex(index);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileHover={
                    isActive
                      ? {
                          scale: 1.05,
                          boxShadow: `0 0 35px ${color}33, inset 0 0 15px ${color}10`,
                          borderColor: `${color}50`,
                        }
                      : {}
                  }
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    {/* Certificate Thumbnail */}
                    <div className="relative w-full h-[82%] overflow-hidden rounded-xl bg-black/40 border border-white/5 group">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />
                      
                      {/* Zoom Indicator Icon */}
                      {isActive && (
                        <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#00F2FE]">
                          <FaSearchPlus size={12} />
                        </div>
                      )}
                    </div>


                    {/* Issuer and Details */}
                    <div className="h-[20%] flex items-center justify-between px-3 mt-1 underline-none">
                      <div className="truncate pr-4 flex-1">
                        <h3 className="text-white text-xs md:text-sm font-extrabold truncate tracking-wide leading-tight">{cert.title}</h3>
                        <div className="flex items-center gap-2 mt-[2px]">
                          <span
                            className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                            style={{ backgroundColor: `${color}10`, color, borderColor: `${color}25` }}
                          >
                            {cert.issuer}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-400 font-mono text-[9px] md:text-[10px] border border-white/5 px-2 bg-black/30 rounded-full select-none shrink-0 py-0.5 mt-[-4px]">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:mt-12">
          {certificatesList.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-primary shadow-[0_0_8px_#00F2FE]'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              title={`View slide ${index + 1}`}
              aria-label={`Jump to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal overlay - portal based */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && activeCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6"
                onClick={() => setSelectedIndex(null)}
              >
                {/* Header panel */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 select-none">
                  <div className="text-white font-mono text-xs md:text-sm bg-black/40 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-full">
                    {selectedIndex + 1} / {certificatesList.length}
                  </div>

                  <div className="hidden md:block text-white font-bold tracking-wide bg-black/40 backdrop-blur-sm px-6 py-2 border border-white/10 rounded-full max-w-xl truncate">
                    {activeCert.title}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoom((prev) => Math.min(prev + 0.25, 3));
                      }}
                      className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Zoom In"
                    >
                      <FaSearchPlus size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoom((prev) => Math.max(prev - 0.25, 1));
                      }}
                      className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Zoom Out"
                    >
                      <FaSearchMinus size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoom(1);
                      }}
                      className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Reset Zoom"
                    >
                      <FaUndo size={14} />
                    </button>
                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-red-500/50 text-white flex items-center justify-center transition-all ml-2 cursor-pointer"
                      title="Close"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                </div>

                {/* Viewport content */}
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-6 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:border-primary/50 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Previous Certificate"
                  >
                    <FaChevronLeft size={18} />
                  </button>

                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className="relative max-w-[90%] max-h-[85%] overflow-hidden rounded-lg flex items-center justify-center select-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="overflow-auto max-w-full max-h-full scrollbar-none flex items-center justify-center">
                      {imageError ? (
                        <div className="text-center p-8 bg-red-950/20 border border-red-500/30 rounded-xl max-w-md select-text">
                          <p className="text-red-400 font-bold mb-2">Error Loading Certificate</p>
                          <p className="text-gray-400 text-xs font-mono">
                            The certificate image could not be loaded. Please verify it is available.
                          </p>
                        </div>
                      ) : (
                        <motion.img
                          src={activeCert.image}
                          alt={activeCert.title}
                          onError={() => setImageError(true)}
                          className="max-w-full max-h-[75vh] object-contain rounded transition-transform duration-200 origin-center"
                          style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
                        />
                      )}
                    </div>
                  </motion.div>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-6 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:border-primary/50 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Next Certificate"
                  >
                    <FaChevronRight size={18} />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-center select-none pointer-events-none">
                  <p className="text-gray-400 text-xs md:text-sm font-mono tracking-widest uppercase">
                    {activeCert.issuer} — {activeCert.date}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Certifications;
