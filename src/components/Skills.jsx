import React from 'react';
import { motion } from 'framer-motion';
import {
  SiSolidity, SiJavascript,
  SiMongodb, SiGit, SiGithub, SiHtml5, SiGo,
  SiDocker, SiVercel
} from 'react-icons/si';
import {
  FaDatabase, FaCss3Alt,
} from 'react-icons/fa';
import {
  TbWallet, TbChartBar
} from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';
import { AnimatedTitle } from '../pages/Home';

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'languages',
    title: 'Programming Languages',
    accent: '#00F2FE',
    accentSoft: 'rgba(0,242,254,0.12)',
    borderGlow: 'rgba(0,242,254,0.5)',
    skills: [
      { name: 'Solidity (Basic)',   icon: SiSolidity   },
      { name: 'JavaScript (Basic)', icon: SiJavascript },
      { name: 'Go (Basic)',         icon: SiGo         },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    accent: '#05FFCC',
    accentSoft: 'rgba(5,255,204,0.12)',
    borderGlow: 'rgba(5,255,204,0.5)',
    skills: [
      { name: 'HTML5',             icon: SiHtml5      },
      { name: 'CSS3',              icon: FaCss3Alt    },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    accent: '#4FACFE',
    accentSoft: 'rgba(79,172,254,0.12)',
    borderGlow: 'rgba(79,172,254,0.5)',
    skills: [
      { name: 'MongoDB',           icon: SiMongodb    },
      { name: 'SQL',               icon: FaDatabase   },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    accent: '#c084fc',
    accentSoft: 'rgba(192,132,252,0.12)',
    borderGlow: 'rgba(192,132,252,0.5)',
    skills: [
      { name: 'Git',               icon: SiGit        },
      { name: 'GitHub',            icon: SiGithub     },
      { name: 'VS Code',           icon: VscCode      },
      { name: 'Remix IDE',         icon: SiSolidity   },
      { name: 'MetaMask',          icon: TbWallet     },
      { name: 'Docker (Basic)',    icon: SiDocker     },
      { name: 'Vercel',            icon: SiVercel     },
      { name: 'Power BI',          icon: TbChartBar   },
    ],
  },
];

/* ─── Framer Motion variants ────────────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

const categoryVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Floating particle ─────────────────────────────────────────────────────── */
const Particle = ({ style, duration, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    aria-hidden="true"
  />
);

/* ─── Individual Skill Card ─────────────────────────────────────────────────── */
const SkillCard = ({ skill, accent, accentSoft, borderGlow }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        scale: 1.05,
        rotate: 1.5,
        boxShadow: `0 0 25px ${accentSoft}, 0 8px 32px rgba(0,0,0,0.35)`,
        transition: { type: 'spring', stiffness: 300, damping: 18 },
      }}
      className="skill-glass-card"
      style={{ '--accent': accent, '--accent-soft': accentSoft, '--border-glow': borderGlow }}
    >
      {/* Icon */}
      <motion.span
        className="skill-icon"
        whileHover={{ rotate: 10, scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
        aria-hidden="true"
      >
        <Icon />
      </motion.span>

      {/* Name */}
      <span className="skill-name">{skill.name}</span>

      {/* Bottom glow line */}
      <div className="skill-glow-line" aria-hidden="true" />
    </motion.div>
  );
};

/* ─── Category Block ────────────────────────────────────────────────────────── */
const CategoryBlock = ({ category, catIdx }) => (
  <motion.div
    variants={categoryVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
  >
    {/* Category Label */}
    <div className="cat-header">
      <div className="cat-dot" style={{ background: category.accent }} />
      <h3 className="cat-title" style={{ color: category.accent }}>
        {category.title}
      </h3>
      <div className="cat-line" style={{ background: `linear-gradient(to right, ${category.accent}40, transparent)` }} />
    </div>

    {/* Cards Grid */}
    <motion.div
      className="skills-grid"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {category.skills.map((skill) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          accent={category.accent}
          accentSoft={category.accentSoft}
          borderGlow={category.borderGlow}
        />
      ))}
    </motion.div>
  </motion.div>
);

/* ─── Main Section ──────────────────────────────────────────────────────────── */
const Skills = () => (
  <section
    id="skills"
    aria-labelledby="skills-heading"
    className="skills-section"
  >
    {/* ── Ambient background blobs ── */}
    <div className="blob blob-1" aria-hidden="true" />
    <div className="blob blob-2" aria-hidden="true" />
    <div className="blob blob-3" aria-hidden="true" />

    {/* ── Floating particles ── */}
    <Particle style={{ left:  '6%',  top: '18%', width: 5, height: 5, background: 'rgba(0,242,254,0.55)'   }} duration={5}  delay={0}   />
    <Particle style={{ left: '90%',  top: '12%', width: 4, height: 4, background: 'rgba(121,40,202,0.55)'  }} duration={7}  delay={1.2} />
    <Particle style={{ left: '22%',  top: '78%', width: 6, height: 6, background: 'rgba(0,242,254,0.40)'   }} duration={6}  delay={0.6} />
    <Particle style={{ left: '78%',  top: '62%', width: 5, height: 5, background: 'rgba(79,172,254,0.50)'  }} duration={8}  delay={2}   />
    <Particle style={{ left: '50%',  top: '88%', width: 4, height: 4, background: 'rgba(168,85,247,0.45)'  }} duration={5}  delay={1.8} />
    <Particle style={{ left: '38%',  top: '25%', width: 3, height: 3, background: 'rgba(0,242,254,0.35)'   }} duration={9}  delay={0.9} />
    <Particle style={{ left: '85%',  top: '82%', width: 7, height: 7, background: 'rgba(192,132,252,0.35)' }} duration={6}  delay={2.5} />
    <Particle style={{ left: '65%',  top: '5%',  width: 4, height: 4, background: 'rgba(0,242,254,0.45)'   }} duration={7}  delay={3}   />

    <div className="skills-inner">

      {/* ── Title ── */}
      <AnimatedTitle
        text="My Skills"
        subtext="Technologies I build with — from smart contracts to full-stack dapps."
      />

      {/* ── Categories ── */}
      <div className="categories-stack">
        {CATEGORIES.map((cat, i) => (
          <CategoryBlock key={cat.id} category={cat} catIdx={i} />
        ))}
      </div>

    </div>

    {/* ── Styles ── */}
    <style>{`
      /* ── section shell ── */
      .skills-section {
        position: relative;
        padding: 96px 0;
        background: #07090F;
        overflow: hidden;
      }

      .skills-inner {
        max-width: 1152px;
        margin: 0 auto;
        padding: 0 24px;
        position: relative;
        z-index: 10;
      }

      /* ── ambient blobs ── */
      .blob {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        filter: blur(110px);
      }
      .blob-1 { width: 420px; height: 420px; top: -80px;  right: 0;    background: rgba(0,242,254,0.055); }
      .blob-2 { width: 480px; height: 480px; bottom: -100px; left: -60px; background: rgba(121,40,202,0.06); }
      .blob-3 { width: 360px; height: 280px; top: 40%;   left: 35%;   background: rgba(79,172,254,0.04); }

      /* ── category layout ── */
      .categories-stack { display: flex; flex-direction: column; gap: 52px; }

      /* ── category header ── */
      .cat-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 22px;
      }
      .cat-dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
        box-shadow: 0 0 8px currentColor;
      }
      .cat-title {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-family: 'Fira Code', monospace;
        white-space: nowrap;
      }
      .cat-line {
        flex: 1;
        height: 1px;
        border-radius: 2px;
      }

      /* ── cards grid ── */
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 14px;
      }

      /* ── individual glass card ── */
      .skill-glass-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 22px 12px 18px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.07);
        background: rgba(13, 20, 35, 0.55);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        cursor: default;
        transition:
          border-color 0.3s ease,
          background   0.3s ease,
          box-shadow   0.3s ease;
        overflow: hidden;
      }
      .skill-glass-card:hover {
        border-color: var(--border-glow);
        background: rgba(13, 20, 45, 0.72);
        box-shadow:
          0 0 20px var(--accent-soft),
          0 8px 32px rgba(0,0,0,0.35),
          inset 0 1px 0 rgba(255,255,255,0.06);
      }

      /* ── icon ── */
      .skill-icon {
        font-size: 26px;
        color: var(--accent);
        filter: drop-shadow(0 0 6px var(--accent));
        display: flex;
        align-items: center;
        justify-content: center;
        transition: filter 0.3s ease, color 0.3s ease;
      }
      .skill-glass-card:hover .skill-icon {
        filter: drop-shadow(0 0 12px var(--accent));
      }

      /* ── label ── */
      .skill-name {
        font-size: 11.5px;
        font-weight: 600;
        color: #cbd5e1;
        text-align: center;
        letter-spacing: 0.02em;
        line-height: 1.3;
        transition: color 0.3s ease;
      }
      .skill-glass-card:hover .skill-name { color: #ffffff; }

      /* ── bottom glow accent line ── */
      .skill-glow-line {
        position: absolute;
        bottom: 0; left: 20%; right: 20%;
        height: 2px;
        border-radius: 2px;
        background: var(--accent);
        opacity: 0;
        transition: opacity 0.3s ease, left 0.3s ease, right 0.3s ease;
        box-shadow: 0 0 8px var(--accent);
      }
      .skill-glass-card:hover .skill-glow-line {
        opacity: 0.7;
        left: 10%; right: 10%;
      }

      /* ── responsive ── */
      @media (max-width: 768px) {
        .skills-section { padding: 72px 0; }
        .skills-grid    { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; }
        .skill-glass-card { padding: 18px 10px 14px; }
        .skill-icon     { font-size: 22px; }
        .skill-name     { font-size: 10.5px; }
      }

      @media (max-width: 480px) {
        .skills-grid { grid-template-columns: repeat(3, 1fr); gap: 9px; }
        .skill-glass-card { padding: 16px 8px 12px; }
      }
    `}</style>
  </section>
);

export default Skills;
