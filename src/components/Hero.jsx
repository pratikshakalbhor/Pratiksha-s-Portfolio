import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import { SiSolidity, SiEthereum } from 'react-icons/si';

const roleStrings = [
  'Blockchain Developer',
  'Solidity Engineer',
  'Frontend Developer',
  'Web3 Builder',
];

// Interactive 3D orbital blockchain atom component (Stable Atomic/Solar System Orbit)
const BlockchainOrb = () => {
  const orbRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [angleOffset, setAngleOffset] = useState(0);
  const angleRef = useRef(0);

  // Sync cursor movements for subtle 3D parallax orientation tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouse({
        x: ((e.clientX - cx) / (rect.width / 2)) * 6,
        y: ((e.clientY - cy) / (rect.height / 2)) * -6,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // requestAnimationFrame loop with angle accumulation ref to prevent speed change jumps/jitter
  useEffect(() => {
    let animId;
    const step = () => {
      const currentSpeed = isHovered ? 0.0022 : 0.0065;
      angleRef.current = (angleRef.current + currentSpeed) % (Math.PI * 2);
      setAngleOffset(angleRef.current);
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const rings = [
    { rx: 215, ry: 68, rotateBase: 0,   duration: 9,  color: 'rgba(0,242,254,0.45)', clockwise: true },
    { rx: 192, ry: 60, rotateBase: 60,  duration: 13, color: 'rgba(168,85,247,0.35)', clockwise: false },
    { rx: 232, ry: 74, rotateBase: -35, duration: 17, color: 'rgba(5,255,204,0.3)',  clockwise: true },
  ];

  // Distribute the 6 nodes exactly back-to-back on the 3 orbital rings
  const orbNodes = [
    { label: 'Solidity',  ringIndex: 0, phaseOffset: 0,            color: '#00F2FE', size: 11 },
    { label: 'Hardhat',   ringIndex: 0, phaseOffset: Math.PI,     color: '#05FFCC', size: 9  },
    { label: 'React',     ringIndex: 1, phaseOffset: 0,            color: '#A855F7', size: 10 },
    { label: 'IPFS',      ringIndex: 1, phaseOffset: Math.PI,     color: '#A855F7', size: 10 },
    { label: 'Web3.js',   ringIndex: 2, phaseOffset: 0,            color: '#00F2FE', size: 12 },
    { label: 'Ethers.js', ringIndex: 2, phaseOffset: Math.PI,     color: '#00F2FE', size: 11 },
  ];

  // Mathematical mapping of node positions tracing the tilted ellipse paths
  const getNodeProps = (node) => {
    const ring = rings[node.ringIndex];
    const direction = ring.clockwise ? 1 : -1;
    // Keep different orbit speeds synchronized with the ring's customized rates
    const speedMult = 9 / ring.duration;
    const angle = angleOffset * direction * speedMult + node.phaseOffset;

    // Position coordinates along the local unrotated flat ellipse path
    const lx = ring.rx * Math.cos(angle);
    const ly = ring.ry * Math.sin(angle);

    // Rotate local coordinate to align with ring rotation orientation
    const rad = (ring.rotateBase * Math.PI) / 180;
    const x = lx * Math.cos(rad) - ly * Math.sin(rad);
    const y = lx * Math.sin(rad) + ly * Math.cos(rad);

    // Depth check relative to Y-coordinate displacement for 3D stack ordering
    const zIndex = ly > 0 ? 30 : 5;

    return { x, y, zIndex };
  };

  return (
    <motion.div
      ref={orbRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[560px] h-[560px] mx-auto flex items-center justify-center select-none"
      animate={{
        rotateX: mouse.y,
        rotateY: mouse.x,
        y: [0, -10, 0],
      }}
      transition={{
        rotateX: { type: 'spring', stiffness: 50, damping: 20 },
        rotateY: { type: 'spring', stiffness: 50, damping: 20 },
        y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
    >
      {/* Styles for breathing central glow card and pulse effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathScale {
          0%, 100% { transform: scale(1); opacity: 0.65; }
          50% { transform: scale(1.12); opacity: 0.95; }
        }
        @keyframes nodePulseAnim {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 16px var(--node-glow); }
          50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 26px var(--node-glow); }
        }
        .breathing-glow-bg {
          animation: breathScale 4.5s infinite ease-in-out;
        }
      `}} />

      {/* Breathing background glow behind core */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full breathing-glow-bg pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,242,254,0.18) 0%, rgba(168,85,247,0.06) 45%, transparent 70%)',
          opacity: isHovered ? 1 : 0.85,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Subtle floating particles around the center */}
      {[...Array(10)].map((_, i) => {
        const rad = (i * 36 * Math.PI) / 180;
        const dist = 75 + (i % 3) * 35; 
        const px = Math.cos(rad) * dist;
        const py = Math.sin(rad) * dist * 0.55;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/45 pointer-events-none"
            style={{ left: '50%', top: '50%' }}
            animate={{
              x: [px, px + 8, px - 8, px],
              y: [py, py - 6, py + 6, py],
              scale: [0.6, 1.2, 0.6],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5 + (i % 3) * 1.5,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        );
      })}

      {/* Core sphere with glowing, centered Ethereum logo */}
      <div
        className="absolute w-56 h-56 rounded-full Restoration-Center z-10 flex items-center justify-center pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(0,242,254,0.55) 0%, rgba(8,11,17,0.98) 60%, rgba(121,40,202,0.38) 100%)',
          boxShadow: isHovered 
            ? '0 0 90px rgba(0,242,254,0.55), inset 0 0 55px rgba(0,242,254,0.25)' 
            : '0 0 70px rgba(0,242,254,0.4), inset 0 0 45px rgba(0,242,254,0.18)',
          border: isHovered
            ? '2.5px solid rgba(0,242,254,0.55)'
            : '1.5px solid rgba(0,242,254,0.4)',
          transition: 'all 0.4s ease',
        }}
      >
        <SiEthereum
          className="text-7xl text-primary opacity-90 filter drop-shadow-[0_0_18px_rgba(0,242,254,0.95)]"
          style={{
            animation: `spin 15s linear infinite reverse`,
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        />
      </div>

      {/* Orbital rings - synchronized and alternated */}
      {rings.map((ring, i) => {
        const directionMultiplier = ring.clockwise ? 1 : -1;
        const currentAngle = ((angleOffset * 180) / Math.PI) * directionMultiplier * (9 / ring.duration);

        return (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${ring.rx * 2}px`,
              height: `${ring.ry * 2}px`,
              border: `1px solid ${ring.color}`,
              transform: `rotateZ(${ring.rotateBase}deg) rotateX(75deg) rotate(${currentAngle}deg)`,
              boxShadow: isHovered ? `0 0 10px ${ring.color}` : 'none',
              transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            }}
          />
        );
      })}

      {/* Orbiting nodes bound strictly to their orbital paths */}
      {orbNodes.map((node, i) => {
        const { x, y, zIndex } = getNodeProps(node);

        return (
          <div
            key={node.label}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              zIndex: zIndex,
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              pointerEvents: 'auto',
            }}
          >
            <motion.div
              className="rounded-full flex items-center justify-center relative cursor-help"
              style={{
                width: `${node.size * 2 + 10}px`,
                height: `${node.size * 2 + 10}px`,
                backgroundColor: `${node.color}25`,
                border: `1.5px solid ${node.color}80`,
                boxShadow: isHovered 
                  ? `0 0 20px ${node.color}90` 
                  : `0 0 12px ${node.color}60`,
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                '--node-glow': node.color,
                animation: 'nodePulseAnim 3.5s infinite ease-in-out',
                animationDelay: `${i * 0.4}s`,
              }}
              whileHover={{ scale: 1.25 }}
            >
              <div
                className="rounded-full"
                style={{
                  width: node.size + 2,
                  height: node.size + 2,
                  backgroundColor: node.color,
                  boxShadow: `0 0 6px ${node.color}`,
                }}
              />
              {/* Stable, non-rotating Label */}
              <div
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold tracking-wider whitespace-nowrap opacity-90 select-none transition-transform duration-300"
                style={{ color: node.color }}
              >
                {node.label}
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

// Interactive Magnetic button with animated hover glow & sweep
const MagneticButton = ({ children, className, href, onClick, target, rel, style = {} }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = (clientX - cx) * 0.12;
    const dy = (clientY - cy) * 0.12;
    setPosition({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative rounded-full font-semibold px-8 py-3 select-none flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer outline-none ${className}`}
      style={style}
    >
      {/* Glow backdrop boundary layer */}
      <span className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-500 z-0 pointer-events-none" />

      {/* Sweep highlight animation */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ x: '-150%' }}
            animate={{ x: '180%' }}
            exit={{ x: '180%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-3/4 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10 skew-x-12"
          />
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.a>
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
      <div className="absolute top-[20%] left-[10%] w-[200px] md:w-[350px] h-[200px] md:h-[350px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

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
            <MagneticButton
              href="#projects"
              onClick={scrollToProjects}
              className="text-dark bg-gradient-to-r from-primary via-[#4FACFE] to-secondary shadow-[0_0_15px_rgba(0,242,254,0.35)] hover:shadow-[0_0_30px_rgba(0,242,254,0.7)] text-black"
            >
              View Projects
            </MagneticButton>
            
            <MagneticButton
              href="/Pratiksha_Kalbhor_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-dark-card border border-white/10 hover:border-primary/50 shadow-[0_0_10px_rgba(0,242,254,0.05)] hover:shadow-[0_0_20px_rgba(0,242,254,0.25)]"
            >
              View Resume <FaFilePdf size={14} className="text-primary group-hover:text-white transition-colors duration-300" />
            </MagneticButton>

            <MagneticButton
              href="#contact"
              onClick={scrollToContact}
              className="text-white bg-dark-lighter border border-dark-border hover:bg-dark-card hover:border-secondary/50 shadow-[0_0_10px_rgba(121,40,202,0.03)] hover:shadow-[0_0_20px_rgba(121,40,202,0.25)]"
            >
              Contact Me
            </MagneticButton>
          </motion.div>
          
          {/* Social connections */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Connect:</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/pratikshakalbhor"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/pratikshakalbhor/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/pratikshaK61510"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl flex items-center justify-center"
                aria-label="Twitter Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:pratikshakalbhor20@gmail.com"
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="/Pratiksha_Kalbhor_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300 text-2xl"
                aria-label="View Resume"
              >
                <FaFilePdf />
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
