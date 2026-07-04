import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { certificatesList } from '../data/certificates';

const issuers = {
  'Coursera': '#0056D2',
  'NPTEL': '#EA4335',
  'Udemy': '#A435F0',
  'freeCodeCamp': '#0A0A23',
  'GitHub': '#24292e',
  'IBM': '#006699',
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

const CertCard = ({ cert }) => {
  const color = getIssuerColor(cert.issuer);

  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group cursor-default select-none"
      style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${color}22, 0 0 25px ${color}18` }}
      />

      {/* Corner background icon */}
      <div
        className="absolute -right-4 -bottom-4 text-7xl transform rotate-12 transition-colors duration-500 pointer-events-none"
        style={{ color: `${color}18` }}
        aria-hidden="true"
      >
        <FaCertificate />
      </div>

      {/* Issuer bar */}
      <div
        className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4"
        style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}40` }}
      >
        {cert.issuer}
      </div>

      <div>
        <h3 className="text-base font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300 mb-3 leading-snug">
          {cert.title}
        </h3>

        {/* Verified badge */}
        <div className="flex items-center gap-1.5 mb-4">
          <GoVerified className="text-emerald-400" size={13} aria-hidden="true" />
          <span className="text-emerald-400 text-[10px] font-mono font-semibold">VERIFIED CREDENTIAL</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between z-10">
        <span className="text-[10px] font-mono text-gray-500">Year: <span className="text-primary">{cert.date}</span></span>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors duration-300 focus:outline-none"
          style={{ color }}
          aria-label={`View certificate for ${cert.title}`}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = color}
        >
          View Cert <FaExternalLinkAlt size={9} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
};

const Certifications = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

        {/* Swiper Carousel */}
        <div className="relative">
          {/* Nav buttons */}
          <button
            ref={prevRef}
            className="cert-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-dark-lighter border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none"
            aria-label="Previous certificate"
          >
            <FaChevronLeft size={13} />
          </button>
          <button
            ref={nextRef}
            className="cert-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-dark-lighter border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none"
            aria-label="Next certificate"
          >
            <FaChevronRight size={13} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: '.cert-prev', nextEl: '.cert-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6 px-2"
          >
            {certificatesList.map((cert) => (
              <SwiperSlide key={cert.id} className="h-auto">
                <CertCard cert={cert} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
