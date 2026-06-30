import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Dynamic graphic backdrops */}
      <ParticleBackground />
      <div className="gradient-bg" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Single Page content list */}
      <main className="relative z-10 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      {/* Footnote Signature */}
      <Footer />
    </div>
  );
};

export default Home;
