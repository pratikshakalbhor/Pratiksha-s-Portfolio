import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronUp } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#080B11] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and signature */}
        <div className="flex items-center gap-2">
          <SiEthereum className="text-primary text-xl filter drop-shadow-[0_0_5px_#00F2FE]" />
          <span className="text-white text-sm font-semibold tracking-wider font-mono">
            PRATIKSHA.ETH
          </span>
        </div>

        {/* Social Vector Grid */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/pratikshakalbhor" 
            target="_blank" 
            rel="noreferrer" 
            className="text-gray-400 hover:text-primary transition-colors duration-300 text-lg"
            aria-label="GitHub Link"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/pratikshakalbhor/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-gray-400 hover:text-primary transition-colors duration-300 text-lg"
            aria-label="LinkedIn Link"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://x.com/pratikshaK61510" 
            target="_blank" 
            rel="noreferrer" 
            className="text-gray-400 hover:text-primary transition-colors duration-300 text-lg flex items-center justify-center"
            aria-label="Twitter Link"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a 
            href="mailto:kalbhorpratiksha333@gmail.com" 
            className="text-gray-400 hover:text-primary transition-colors duration-300 text-lg"
            aria-label="Email Address Link"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright and Arrow Return */}
        <div className="flex items-center gap-6">
          <p className="text-gray-500 text-xs text-center md:text-right">
            &copy; {currentYear} Pratiksha Kalbhor. All rights reserved.
          </p>
          
          <button 
            onClick={handleBackToTop}
            className="w-9 h-9 rounded-full bg-dark-lighter border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300 flex items-center justify-center focus:outline-none"
            aria-label="Back to Top"
          >
            <FaChevronUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
