import React from 'react';
import { motion } from 'framer-motion';
import { servicesList } from '../data/services';

const Services = () => {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 relative overflow-hidden bg-dark">
      {/* Glow orbs */}
      <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            My <span className="text-primary text-glow-cyan">Services</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">WHAT I CAN HELP YOU BUILD</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 90, damping: 15, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 hover:border-primary/30 shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary text-2xl w-fit mb-5 group-hover:bg-primary/20 transition-colors duration-300" aria-hidden="true">
                  <Icon />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Feature Points */}
                <ul className="space-y-2" role="list">
                  {service.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
