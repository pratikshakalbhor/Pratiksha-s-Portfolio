import React, { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// Lazy-loaded sections for code splitting & performance
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));
const GitHubSection = lazy(() => import('../components/GitHubSection'));
const CurrentlyLearning = lazy(() => import('../components/CurrentlyLearning'));
const Certifications = lazy(() => import('../components/Certifications'));
const Achievements = lazy(() => import('../components/Achievements'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

// Minimal section fallback while lazy chunk loads
const SectionFallback = () => (
  <div className="flex items-center justify-center py-20 animate-pulse" aria-hidden="true">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// High-perf reusable wrapper for scroll-triggered section reveal
export const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Premium Animated Section Title with stagger characters
export const AnimatedTitle = ({ text, subtext }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <div className="text-center mb-16 select-none">
      <motion.h2
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider relative inline-block cursor-default"
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            className={letter === " " ? "inline-block w-2" : "inline-block text-glow-cyan"}
          >
            {letter}
          </motion.span>
        ))}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-primary rounded-full shadow-[0_0_12px_#00F2FE]"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          aria-hidden="true"
        />
      </motion.h2>
      {subtext && (
        <p className="text-gray-400 text-xs md:text-sm mt-6 tracking-widest font-mono uppercase opacity-75">
          {subtext}
        </p>
      )}
    </div>
  );
};

const Home = () => {
  // Mount Lenis Smooth Scroll on initial load
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* ── Navbar lives OUTSIDE the overflow wrapper so position:fixed works correctly ── */}
      <Navbar />

      <div className="relative min-h-screen bg-dark">
        {/* 1. Subtle, slow floating neon gradient blobs for visual depth */}
        <div className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/4 blur-[180px] animate-pulse pointer-events-none mix-blend-screen" aria-hidden="true" />
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/4 blur-[220px] animate-pulse-slow pointer-events-none mix-blend-screen" aria-hidden="true" />
        <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-primary/4 blur-[190px] animate-pulse pointer-events-none mix-blend-screen" aria-hidden="true" />

        {/* 2. Interactive tsParticles Backdrop */}
        <ParticleBackground />
        <div className="gradient-bg" aria-hidden="true" />

        {/* 3. Single-Page Main Scroller */}
        <main id="main-content" className="relative w-full flex flex-col gap-10">
        {/* Render immediately for rapid initial page speed (LCP Optimization) */}
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <About />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <GitHubSection />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <CurrentlyLearning />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <Certifications />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <Achievements />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
