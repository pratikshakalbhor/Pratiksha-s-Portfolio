import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { certificatesList } from '../data/certificates';

const Certifications = () => {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-dark">
      {/* Visual background lights */}
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[320px] h-[320px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Certifications
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">CREDENTIAL VERIFICATION MATRIX</p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesList.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl glassmorphism-hover flex flex-col justify-between h-full relative overflow-hidden group"
            >
              {/* Corner decor icon */}
              <div className="absolute -right-4 -bottom-4 text-white/5 text-7xl transform rotate-12 group-hover:text-primary/10 transition-colors duration-500">
                <FaCertificate />
              </div>

              <div>
                {/* Header: Verified badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary tracking-wider uppercase">
                    {cert.category}
                  </span>
                  
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                    <GoVerified className="animate-pulse" /> Verified
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300 mb-2 leading-relaxed">
                  {cert.title}
                </h3>

                <p className="text-gray-400 text-xs font-medium mb-3">
                  Issuer: {cert.issuer}
                </p>

                {/* Credential ID */}
                <div className="bg-dark/60 border border-white/5 rounded-lg py-1 px-2.5 w-fit mb-6">
                  <span className="text-[9px] font-mono tracking-wider text-gray-500">ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* Action Verify Link */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono text-gray-500">Issued: {cert.date}</span>
                
                <a
                  href={cert.link}
                  className="text-xs text-primary hover:text-white transition-colors duration-300 font-mono font-semibold flex items-center gap-1.5"
                >
                  Verify <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
