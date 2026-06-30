import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { SiSolidity, SiEthereum } from 'react-icons/si';

const roleStrings = [
  'Blockchain Developer',
  'Web3 Enthusiast',
  'Smart Contract Architect',
  'Dapp UI Engineer'
];

const Hero = () => {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typewriting character effect loop
  useEffect(() => {
    let timer;
    const currentFullRole = roleStrings[roleIndex];

    const type = () => {
      if (!isDeleting) {
        setRoleText((prev) => currentFullRole.substring(0, prev.length + 1));
        if (roleText === currentFullRole) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait on word full
          return;
        }
      } else {
        setRoleText((prev) => currentFullRole.substring(0, prev.length - 1));
        if (roleText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roleStrings.length);
          return;
        }
      }

      const nextSpeed = isDeleting ? 50 : 100;
      setTypingSpeed(nextSpeed);
    };

    timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const offsetPos = contactSection.offsetTop - 80;
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
    }
  };

  // Framer Motion spring presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Neon Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Texts & Info Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          <motion.span 
            variants={itemVariants} 
            className="text-primary text-sm font-mono tracking-widest uppercase mb-3 flex items-center gap-2"
          >
            <SiEthereum className="animate-spin-slow text-glow-cyan" /> MAINNET IS ACTIVE
          </motion.span>
          
          <motion.h3 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 font-medium mb-1 font-mono"
          >
            Hello World, I'm
          </motion.h3>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            <span className="text-glow-cyan">Pratiksha</span> <span className="gradient-text">Kalbhor</span>
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-300 font-semibold h-10 mb-6 flex items-center gap-1 font-mono"
          >
            A <span className="text-primary text-glow-cyan">{roleText}</span>
            <span className="w-[3px] h-[24px] bg-primary animate-pulse" />
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-xl text-base md:text-lg leading-relaxed mb-8"
          >
            I am a blockchain student at Savitribai Phule Pune University, constructing secure, gas-optimized Solidity smart contracts, decentralized infrastructures, and interactive Web3 frontend experiences.
          </motion.p>
          
          {/* Action CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-8"
          >
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className="px-8 py-3 rounded-full font-semibold text-dark bg-primary hover:bg-[#00d0e6] transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] transform hover:-translate-y-0.5"
            >
              Contact Me
            </a>
            
            <a 
              href="/resume.pdf" 
              download 
              className="px-6 py-3 rounded-full font-semibold text-white bg-dark-lighter border border-dark-border hover:bg-dark-card hover:border-primary/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <FaFileDownload /> Get Resume
            </a>
          </motion.div>
          
          {/* Social connections */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Connect ID:</span>
            <div className="flex gap-4">
              <a 
                href="https://github.com/pratiksha-kalbhor" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a 
                href="https://linkedin.com/in/pratiksha-kalbhor" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a 
                href="mailto:pratikshakalbhor20@gmail.com" 
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="Email Mailbox"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Code Mockup Column */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.6 }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="relative group">
            {/* Ambient neon backdrop glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-primary-purple to-secondary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            {/* The solidity window card */}
            <div className="relative glassmorphism rounded-2xl overflow-hidden shadow-2xl p-6 border-white/5 font-mono text-xs text-gray-300 md:text-sm">
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <SiSolidity className="text-[#8C8C8C]" /> DeveloperProfile.sol
                </div>
                <div className="w-[42px]" />
              </div>

              {/* Code lines */}
              <div className="space-y-1.5 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-gray-500">01</span> <span className="text-[#FF79C6]">pragma solidity</span> <span className="text-[#50FA7B]">^0.8.20</span>;</div>
                <div><span className="text-gray-500">02</span></div>
                <div><span className="text-gray-500">03</span> <span className="text-[#FF79C6]">contract</span> <span className="text-[#50FA7B] font-bold">DeveloperProfile</span> &#123;</div>
                <div><span className="text-gray-500">04</span>     <span className="text-[#FF79C6] pl-4">string</span> <span className="text-[#FF79C6] inline">public</span> <span className="text-white">name</span> = <span className="text-[#F1FA8C]">"Pratiksha Kalbhor"</span>;</div>
                <div><span className="text-gray-500">05</span>     <span className="text-[#FF79C6] pl-4">string</span> <span className="text-[#FF79C6] inline">public</span> <span className="text-white">education</span> = <span className="text-[#F1FA8C]">"BSc Blockchain @ SPPU"</span>;</div>
                <div><span className="text-gray-500">06</span>     <span className="text-[#FF79C6] pl-4">address</span> <span className="text-[#FF79C6] inline">public</span> <span className="text-white">wallet</span> = <span className="text-[#BD93F9]">0x4FAC...E20F</span>;</div>
                <div><span className="text-gray-500">07</span></div>
                <div><span className="text-gray-500">08</span>     <span className="text-[#FF79C6] pl-4">struct</span> <span className="text-[#50FA7B]">Focus</span> &#123;</div>
                <div><span className="text-gray-500">09</span>         <span className="text-white pl-8">string[] coreStacks;</span></div>
                <div><span className="text-gray-500">10</span>         <span className="text-[#FF79C6] pl-8">bool</span> <span className="text-white">passionForDeFi;</span></div>
                <div><span className="text-gray-500">11</span>     &#125;</div>
                <div><span className="text-gray-500">12</span></div>
                <div><span className="text-gray-500">13</span>     <span className="text-[#FF79C6] pl-4">function</span> <span className="text-[#50FA7B]">getCoreFocus</span>() <span className="text-[#FF79C6] inline">public</span> <span className="text-[#FF79C6] inline">view</span> <span className="text-[#FF79C6] inline">returns</span> (Focus <span className="text-[#FF79C6] inline">memory</span>) &#123;</div>
                <div><span className="text-gray-500">14</span>         <span className="text-[#FF79C6] pl-8">string[] memory stacks</span> = <span className="text-[#FF79C6] inline">new string[]</span>(<span className="text-[#BD93F9]">3</span>);</div>
                <div><span className="text-gray-500">15</span>         stacks[<span className="text-[#BD93F9]">0</span>] = <span className="text-[#F1FA8C]">"Solidity/Rust"</span>;</div>
                <div><span className="text-gray-500">16</span>         stacks[<span className="text-[#BD93F9]">1</span>] = <span className="text-[#F1FA8C]">"Hardhat/Ethers"</span>;</div>
                <div><span className="text-gray-500">17</span>         stacks[<span className="text-[#BD93F9]">2</span>] = <span className="text-[#F1FA8C]">"React/Tailwind"</span>;</div>
                <div><span className="text-gray-500">18</span>         <span className="text-[#FF79C6] pl-8">return</span> Focus(stacks, <span className="text-[#FF79C6] inline">true</span>);</div>
                <div><span className="text-gray-500">19</span>     &#125;</div>
                <div><span className="text-gray-500">20</span> &#125;</div>
              </div>
            </div>
            
            {/* Little floating indicators */}
            <div className="absolute -bottom-4 -left-4 bg-[#111827]/90 border border-white/5 rounded-lg py-2 px-3 shadow-lg flex items-center gap-2 text-xs font-semibold backdrop-blur animate-float text-primary">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" /> Compiler: v0.8.20+commit
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
