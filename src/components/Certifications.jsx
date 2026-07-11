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

const CertCard = ({ cert, onView }) => {
  const color = getIssuerColor(cert.issuer);
  const hasImage = cert.image && cert.image !== '#' && cert.image !== '';

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group cursor-default select-none animate-fadeIn"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${color}22, inset 0 0 20px ${color}15` }}
      />

      <div>
        {/* Issuer */}
        <div
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4"
          style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}40` }}
        >
          {cert.issuer}
        </div>

        {/* Certificate Name */}
        <h3 className="text-base font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300 mb-6 leading-snug">
          {cert.title}
        </h3>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10 mt-auto">
        <span className="text-[10px] font-mono text-gray-500">Year: <span className="text-primary">{cert.date}</span></span>
        {hasImage ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors duration-300 focus:outline-none bg-transparent border-none cursor-pointer relative z-20"
            style={{ color }}
            aria-label={`View certificate for ${cert.title}`}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = color}
          >
            View Certificate <FaExternalLinkAlt size={9} aria-hidden="true" />
          </button>
        ) : (
          <span
            className="text-xs font-mono font-semibold text-gray-500 cursor-not-allowed select-none"
            aria-label="Certificate Coming Soon"
          >
            Certificate Coming Soon
          </span>
        )}
      </div>
    </motion.article>
  );
};

const Certifications = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);

  // Reset zoom and error status on index change
  useEffect(() => {
    setZoom(1);
    setImageError(false);
  }, [selectedIndex]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? certificatesList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === certificatesList.length - 1 ? 0 : prev + 1));
  };

  // Handle escape key and arrow navigations
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const activeCert = selectedIndex !== null ? certificatesList[selectedIndex] : null;

  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="py-24 relative overflow-hidden bg-dark">
      {/* Background lights */}
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

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto py-6">
          {certificatesList.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} onView={() => setSelectedIndex(index)} />
          ))}
        </div>

      </div>

      {/* Lightbox / Modal - Transported to document.body to bypass Framer Motion parent bounds */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && activeCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Top Bar with actions */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 select-none">
                <div className="text-white font-mono text-xs md:text-sm bg-black/40 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-full">
                  {selectedIndex + 1} / {certificatesList.length}
                </div>

                {/* Title inside lightbox */}
                <div className="hidden md:block text-white font-bold tracking-wide bg-black/40 backdrop-blur-sm px-6 py-2 border border-white/10 rounded-full max-w-xl truncate">
                  {activeCert.title}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(prev + 0.25, 3)); }}
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                    title="Zoom In"
                  >
                    <FaSearchPlus size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(prev - 0.25, 1)); }}
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                    title="Zoom Out"
                  >
                    <FaSearchMinus size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setZoom(1); }}
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                    title="Reset Zoom"
                  >
                    <FaUndo size={14} />
                  </button>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-red-500/50 text-white flex items-center justify-center transition-all duration-200 ml-2 cursor-pointer"
                    title="Close"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>

              {/* Central Area: Prev - ImageContainer - Next */}
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:border-primary/50 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="Previous Certificate"
                >
                  <FaChevronLeft size={18} />
                </button>

                {/* Image Container with scale motion */}
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
                          The requested certificate file could not be loaded or is missing from the server.
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

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-6 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/10 hover:border-primary/50 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                  title="Next Certificate"
                >
                  <FaChevronRight size={18} />
                </button>
              </div>

              {/* Bottom Info Details */}
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

