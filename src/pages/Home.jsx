import React, { lazy, Suspense } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Loader from '../components/Loader';

// Lazy-loaded sections for code splitting & performance
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Services = lazy(() => import('../components/Services'));
const Experience = lazy(() => import('../components/Experience'));
const GitHubSection = lazy(() => import('../components/GitHubSection'));
const CurrentlyLearning = lazy(() => import('../components/CurrentlyLearning'));
const Certifications = lazy(() => import('../components/Certifications'));
const Achievements = lazy(() => import('../components/Achievements'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

// Minimal section fallback while lazy chunk loads
const SectionFallback = () => (
  <div className="flex items-center justify-center py-20" aria-hidden="true">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Dynamic graphic backdrops */}
      <ParticleBackground />
      <div className="gradient-bg" aria-hidden="true" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main content */}
      <main id="main-content" className="relative z-10 w-full">
        {/* Hero is NOT lazy — it must render immediately for LCP */}
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <GitHubSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <CurrentlyLearning />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
