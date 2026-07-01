import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { SiEthereum } from 'react-icons/si';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Journey', href: '#experience' },
  { name: 'GitHub', href: '#github' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);

      const sections = navLinks.map((link) => link.href.slice(1));
      let currentSection = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'glassmorphism-nav shadow-lg shadow-black/20 py-4' : 'bg-transparent py-6'
        }`}
        role="banner"
      >
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111827]" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary-purple to-secondary shadow-[0_0_10px_rgba(0,242,254,0.6)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 text-xl font-bold tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="Pratiksha Kalbhor — go to homepage"
          >
            <motion.span
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="text-primary text-xl filter drop-shadow-[0_0_5px_#00F2FE]"
              aria-hidden="true"
            >
              <SiEthereum />
            </motion.span>
            <span className="text-white">
              <span className="text-primary font-extrabold text-glow-cyan text-2xl">P</span>ratiksha
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative text-xs font-medium tracking-wide uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1 ${
                  activeSection === link.href.slice(1) ? 'text-primary' : 'text-gray-400 hover:text-white'
                }`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary shadow-[0_0_5px_#00F2FE]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <HiX size={26} aria-hidden="true" /> : <HiMenuAlt3 size={26} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-dark-lighter/95 backdrop-blur-xl border-b border-dark-border"
            >
              <nav className="px-6 py-8 flex flex-col gap-5 max-h-[85vh] overflow-y-auto" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-base font-semibold tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                      activeSection === link.href.slice(1)
                        ? 'text-primary border-l-2 border-primary pl-3'
                        : 'text-gray-400 hover:text-white pl-0'
                    }`}
                    aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
