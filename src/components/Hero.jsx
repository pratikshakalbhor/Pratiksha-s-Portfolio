import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { SiSolidity, SiEthereum } from 'react-icons/si';

const roleStrings = [
  'Blockchain Developer',
  'Solidity Engineer',
  'Frontend Developer',
  'Web3 Builder',
];

// Simple mouse-tracking 3D orb component
const BlockchainOrb = () => {
  const orbRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouse({
        x: ((e.clientX - cx) / (rect.width / 2)) * 10,
        y: ((e.clientY - cy) / (rect.height / 2)) * -10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const orbNodes = [
    { angle: 0,   radius: 185, color: '#00F2FE', size: 12, label: 'Solidity' },
    { angle: 60,  radius: 200, color: '#A855F7', size: 11, label: 'React' },
    { angle: 120, radius: 175, color: '#00F2FE', size: 13, label: 'Web3.js' },
    { angle: 180, radius: 192, color: '#05FFCC', size: 10, label: 'Hardhat' },
    { angle: 240, radius: 210, color: '#A855F7', size: 11, label: 'IPFS' },
    { angle: 300, radius: 180, color: '#00F2FE', size: 12, label: 'Ethers.js' },
  ];

  // rotateBase is numeric (degrees) so Framer Motion can interpolate safely
  const rings = [
    { rx: 215, ry: 68, rotateBase: 0,   duration: 8,  color: 'rgba(0,242,254,0.4)' },
    { rx: 192, ry: 60, rotateBase: 60,  duration: 11, color: 'rgba(168,85,247,0.3)' },
    { rx: 232, ry: 74, rotateBase: -35, duration: 14, color: 'rgba(5,255,204,0.25)' },
  ];

  return (
    <motion.div
      ref={orbRef}
      className="relative w-[560px] h-[560px] mx-auto flex items-center justify-center"
      animate={{
        rotateX: mouse.y,
        rotateY: mouse.x,
        y: [0, -10, 0],
      }}
      transition={{
        rotateX: { type: 'spring', stiffness: 60, damping: 20 },
        rotateY: { type: 'spring', stiffness: 60, damping: 20 },
        y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
    >
      {/* Background pulse glow */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />

      {/* Core sphere — simple CSS spin to avoid Framer Motion positionalValues error */}
      <div
        className="absolute w-56 h-56 rounded-full z-10 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(0,242,254,0.55) 0%, rgba(8,11,17,0.95) 60%, rgba(121,40,202,0.35) 100%)',
          boxShadow: '0 0 80px rgba(0,242,254,0.45), inset 0 0 50px rgba(0,242,254,0.22)',
          border: '2px solid rgba(0,242,254,0.45)',
          animation: 'spin 12s linear infinite',
        }}
      >
        <SiEthereum className="text-7xl text-primary opacity-90 filter drop-shadow-[0_0_18px_rgba(0,242,254,0.95)]"
          style={{ animation: 'spin 12s linear infinite reverse' }}
        />
      </div>

      {/* Orbital rings — pure CSS animation to avoid Framer Motion deg string issues */}
      {rings.map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${ring.rx * 2}px`,
            height: `${ring.ry * 2}px`,
            border: `1px solid ${ring.color}`,
            transform: `rotateZ(${ring.rotateBase}deg) rotateX(75deg)`,
            animation: `spin ${ring.duration}s linear infinite`,
          }}
        />
      ))}

      {/* Orbiting nodes */}
      {orbNodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * node.radius;
        const y = Math.sin(rad) * node.radius * 0.4; // flattened for 3D look
        return (
          <motion.div
            key={node.label}
            className="absolute z-20"
            style={{ left: '50%', top: '50%' }}
            animate={{
              x: [x, x * 0.92, x],
              y: [y, y * 0.88, y],
            }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <motion.div
              className="rounded-full flex items-center justify-center relative"
              style={{
                width: `${node.size * 2 + 10}px`,
                height: `${node.size * 2 + 10}px`,
                backgroundColor: `${node.color}28`,
                border: `1.5px solid ${node.color}80`,
                boxShadow: `0 0 16px ${node.color}70`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: 1.5 }}
            >
              <div
                className="rounded-full"
                style={{ width: node.size + 2, height: node.size + 2, backgroundColor: node.color, boxShadow: `0 0 6px ${node.color}` }}
              />
              {/* Label */}
              <div
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] font-mono font-semibold whitespace-nowrap opacity-80"
                style={{ color: node.color }}
              >
                {node.label}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

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
          timer = setTimeout(() => setIsDeleting(true), 1800);
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
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      window.scrollTo({ top: projectsSection.offsetTop - 80, behavior: 'smooth' });
    }
  };

  // Framer Motion spring presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
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
            <span className="text-primary text-glow-cyan">{roleText}</span>
            <span className="w-[3px] h-[24px] bg-primary animate-pulse" />
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-xl text-base md:text-lg leading-relaxed mb-8"
          >
            I build secure, scalable, and user-friendly Web3 applications. Blockchain student at Savitribai Phule Pune University — connecting smart contracts with beautiful interfaces.
          </motion.p>
          
          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-8"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="px-8 py-3 rounded-full font-semibold text-dark bg-primary hover:bg-[#00d0e6] transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(0,242,254,0.7)] transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
            
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-6 py-3 rounded-full font-semibold text-white bg-dark-lighter border border-dark-border hover:bg-dark-card hover:border-primary/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </motion.div>
          
          {/* Social connections */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Connect:</span>
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
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="/resume.pdf"
                download
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="Download Resume"
              >
                <FaFileDownload />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Blockchain Orb Column */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.5 }}
          className="lg:col-span-5 hidden lg:flex items-center justify-center"
        >
          <BlockchainOrb />
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary" />
        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_#00F2FE]" />
      </motion.div>
    </section>
  );
};

export default Hero;
