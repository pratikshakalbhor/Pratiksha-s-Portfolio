import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { SiEthereum } from 'react-icons/si';

const navLinks = [
  { name: 'Home',         href: '#home' },
  { name: 'About',        href: '#about' },
  { name: 'Skills',       href: '#skills' },
  { name: 'Projects',     href: '#projects' },
  { name: 'Journey',      href: '#experience' },
  { name: 'GitHub',       href: '#github' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact',      href: '#contact' },
];

const Navbar = () => {
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeSection,   setActiveSection]   = useState('home');
  const [scrollProgress,  setScrollProgress]  = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY      = window.scrollY;
      const totalScroll  = document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(scrollY > 20);
      if (totalScroll > 0) setScrollProgress((scrollY / totalScroll) * 100);

      // Determine active section
      const sections = navLinks.map(l => l.href.slice(1));
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  /* ── The actual header JSX ── */
  const headerJSX = (
    <header
      style={{
        /* Inline styles guarantee these rules are NEVER overridden by
           Tailwind purge, parent transforms, or any stacking context.     */
        position:   'fixed',
        top:        0,
        left:       0,
        width:      '100%',
        zIndex:     99999,
        transition: 'background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease',
        background: isScrolled
          ? 'rgba(6, 9, 15, 0.92)'
          : 'rgba(6, 9, 15, 0.55)',
        backdropFilter:         'blur(24px) saturate(1.5)',
        WebkitBackdropFilter:   'blur(24px) saturate(1.5)',
        borderBottom: isScrolled
          ? '1px solid rgba(0,242,254,0.10)'
          : '1px solid rgba(255,255,255,0.04)',
        padding: isScrolled ? '14px 0' : '20px 0',
        boxShadow: isScrolled
          ? '0 2px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(0,242,254,0.06)'
          : 'none',
      }}
      role="banner"
    >
      {/* Scroll progress bar */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: 3,
          background: '#111827',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(to right, #00F2FE, #4FACFE, #7928CA)',
            boxShadow: '0 0 10px rgba(0,242,254,0.6)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a
          href="#home"
          onClick={e => handleLinkClick(e, '#home')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          aria-label="Pratiksha Kalbhor — go to homepage"
        >
          <motion.span
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            style={{ color: '#00F2FE', fontSize: 20, filter: 'drop-shadow(0 0 5px #00F2FE)', display: 'flex' }}
            aria-hidden="true"
          >
            <SiEthereum />
          </motion.span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: '0.05em' }}>
            <span style={{ color: '#00F2FE', fontWeight: 800, fontSize: 22, textShadow: '0 0 12px rgba(0,242,254,0.5)' }}>P</span>
            ratiksha
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'none' }} className="lg-nav" aria-label="Primary navigation">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={e => handleLinkClick(e, link.href)}
                style={{
                  position: 'relative',
                  color: isActive ? '#00F2FE' : '#9ca3af',
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '4px 0',
                  transition: 'color 0.2s',
                }}
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={e => { if (!isActive) e.target.style.color = '#fff'; }}
                onMouseLeave={e => { if (!isActive) e.target.style.color = '#9ca3af'; }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    style={{
                      position: 'absolute', bottom: -2, left: 0, right: 0,
                      height: 2, background: '#00F2FE',
                      boxShadow: '0 0 6px #00F2FE', borderRadius: 2,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', color: '#d1d5db', cursor: 'pointer', padding: 4 }}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <HiX size={26} aria-hidden="true" /> : <HiMenuAlt3 size={26} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: 'rgba(8,11,17,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
            aria-label="Mobile navigation"
          >
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {navLinks.map(link => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={e => handleLinkClick(e, link.href)}
                    style={{
                      color: isActive ? '#00F2FE' : '#9ca3af',
                      fontWeight: 600,
                      fontSize: 14,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      paddingLeft: isActive ? 12 : 0,
                      borderLeft: isActive ? '2px solid #00F2FE' : '2px solid transparent',
                      transition: 'all 0.2s',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Inline responsive styles */}
      <style>{`
        .lg-nav {
          display: none;
          align-items: center;
          gap: 28px;
        }
        .mobile-toggle { display: flex; }

        @media (min-width: 1024px) {
          .lg-nav        { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );

  /* ══════════════════════════════════════════════════════════════
     Render via React Portal directly into <body>.
     This completely escapes ALL parent transforms, overflow,
     stacking contexts — position:fixed works 100% correctly.
  ══════════════════════════════════════════════════════════════ */
  return createPortal(headerJSX, document.body);
};

export default Navbar;
