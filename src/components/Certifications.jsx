import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { certificatesList } from '../data/certificates';

const Certifications = () => {
  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="py-24 relative overflow-hidden bg-dark">
      {/* Visual background lights */}
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
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">CREDENTIAL VERIFICATION MATRIX</p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certificatesList.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl glassmorphism-hover flex flex-col justify-between h-full relative overflow-hidden group"
            >
              {/* Corner decor */}
              <div className="absolute -right-4 -bottom-4 text-white/5 text-7xl transform rotate-12 group-hover:text-primary/10 transition-colors duration-500" aria-hidden="true">
                <FaCertificate />
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300 mb-2 leading-relaxed">
                  {cert.title}
                </h3>

                <p className="text-gray-400 text-xs font-medium mb-6">
                  Issuer: {cert.issuer}
                </p>
              </div>

              {/* Footer: date + view certificate link */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono text-gray-500 font-semibold text-secondary">Year: {cert.date}</span>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-white transition-colors duration-300 font-mono font-semibold flex items-center gap-1.5 focus:outline-none"
                  aria-label={`View certificate for ${cert.title}`}
                >
                  View Certificate <FaExternalLinkAlt size={9} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
