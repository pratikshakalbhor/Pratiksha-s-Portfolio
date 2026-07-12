import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaCircle } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';

const GITHUB_USERNAME = 'pratikshakalbhor';

const REPO_NAMES = [
  'ecochain',
  'freelance-chain',
  'nft-dapp',
  'dataproof',
  'tokenomics-contracts',
  'distributed-systems-practicals',
];

const LANGUAGE_COLORS = {
  Solidity: '#AA6746',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  HTML: '#E44B23',
  CSS: '#563D7C',
  Rust: '#DEA584',
  Go: '#00ADD8',
  default: '#8B949E',
};

const FALLBACK_REPOS = REPO_NAMES.map((name) => ({
  name,
  description:
    name === 'ecochain'
      ? 'Blockchain-based platform for tree plantation, carbon credit tracking, and environmental transparency.'
      : name === 'freelance-chain'
        ? 'Decentralized freelancing platform with Solidity escrow and milestone-based payments.'
        : name === 'nft-dapp'
          ? 'Decentralized NFT application for minting, managing, and exploring NFTs on Ethereum.'
          : name === 'dataproof'
            ? 'Blockchain document verification system for secure, tamper-proof validation of digital records.'
            : name === 'tokenomics-contracts'
              ? 'Solidity smart contracts implementing ERC-20 tokens, staking, and reward mechanisms.'
              : 'University coursework covering distributed systems concepts and blockchain fundamentals.',
  html_url: `https://github.com/${GITHUB_USERNAME}/${name}`,
  stargazers_count: 0,
  language: name === 'distributed-systems-practicals' ? 'Python' : 'Solidity',
  forks_count: 0,
}));

const RepoCard = ({ repo, idx }) => {
  const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default;

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover="hover"
      animate="rest"
      transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.12 }}
      variants={{
        rest: {},
        hover: {
          y: -8,
          borderColor: 'rgba(0, 242, 254, 0.45)',
          boxShadow: '0 0 25px rgba(0, 242, 254, 0.22), 0 10px 30px rgba(0,0,0,0.45)',
        }
      }}
      className="glassmorphism repo-card rounded-2xl p-5 border border-white/5 transition-all duration-300 shadow-lg flex flex-col justify-between gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ minHeight: '140px' }}
      aria-label={`View ${repo.name} repository on GitHub`}
    >
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-white transition-colors duration-300 font-mono">
          <motion.span
            variants={{
              hover: { rotate: 10, scale: 1.05 }
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="flex items-center"
          >
            <FaGithub aria-hidden="true" />
          </motion.span>
          <span className="group-hover:text-primary transition-colors duration-300">{repo.name}</span>
        </span>
        <motion.span
          variants={{
            hover: { rotate: 15, x: 4, y: -4 }
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 15 }}
          className="flex-shrink-0 mt-0.5"
        >
          <FaExternalLinkAlt size={11} className="text-gray-600 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
        </motion.span>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.12 + 0.2 }}
        className="text-gray-400 text-xs leading-relaxed flex-grow"
      >
        {repo.description}
      </motion.p>

      {/* Meta row */}
      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
            {/* Repository Language Dot: Gentle pulse every 3 seconds */}
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: idx * 0.2 }}
              className="flex items-center"
            >
              <FaCircle size={9} style={{ color: langColor }} aria-hidden="true" />
            </motion.span>
            <span>{repo.language}</span>
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
            <FaStar size={9} className="text-yellow-400" aria-hidden="true" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
            <TbGitFork size={10} aria-hidden="true" />
            {repo.forks_count}
          </span>
        )}
      </div>
    </motion.a>
  );
};

const GitHubSection = () => {
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) throw new Error('GitHub API unavailable');
        const all = await res.json();

        // Build a map for O(1) lookup
        const repoMap = {};
        all.forEach((r) => { repoMap[r.name] = r; });

        // Overlay fetched data onto fallback (keeps order + fills gaps)
        const merged = FALLBACK_REPOS.map((fb) =>
          repoMap[fb.name]
            ? {
              name: fb.name,
              description: repoMap[fb.name].description || fb.description,
              html_url: repoMap[fb.name].html_url,
              stargazers_count: repoMap[fb.name].stargazers_count,
              forks_count: repoMap[fb.name].forks_count,
              language: repoMap[fb.name].language || fb.language,
            }
            : fb
        );
        setRepos(merged);
      } catch {
        /* silently keep fallback data */
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="github" aria-labelledby="github-heading" className="py-24 relative overflow-hidden bg-dark-lighter/50">
      {/* Background glow orbs */}
      <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-secondary/4 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      {/* Background slow-moving low-opacity lines */}
      <div className="github-background-line line-1" aria-hidden="true" />
      <div className="github-background-line line-2" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* SECTION TITLE: subtle fade-up, center-expand underline, delay subtitle */}
        <div className="text-center mb-16">
          <motion.h2
            id="github-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block cursor-default"
          >
            <span className="text-primary text-glow-cyan">GitHub</span> Profile
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              aria-hidden="true"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.75, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-400 text-sm mt-6 tracking-widest font-mono uppercase"
          >
            OPEN SOURCE · CODE REPOSITORIES
          </motion.p>
        </div>

        {/* PROFILE CARD: Fade in + translateY(30px), scale from 0.97 -> 1, soft cyan glow on complete */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97, boxShadow: '0 0 0px rgba(0,242,254,0)' }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: '0 0 15px rgba(0,242,254,0.08)',
            transition: { duration: 0.6, ease: 'easeOut' }
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -6,
            borderColor: 'rgba(0, 242, 254, 0.4)',
            boxShadow: '0 0 25px rgba(0, 242, 254, 0.25), 0 10px 30px rgba(0,0,0,0.4)',
            transition: { duration: 0.3 }
          }}
          className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl mb-10 flex flex-col md:flex-row items-center md:items-start gap-6 transition-all duration-300 cursor-default"
        >
          {/* Avatar: soft breathing glow, hover rotate 5 and scale 1.05 */}
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-primary/40 overflow-hidden flex-shrink-0 bg-[#0B0F19] flex items-center justify-center"
            animate={{
              boxShadow: ["0 0 12px rgba(0,242,254,0.25)", "0 0 22px rgba(0,242,254,0.55)", "0 0 12px rgba(0,242,254,0.25)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            aria-hidden="true"
          >
            <FaGithub className="text-4xl text-gray-400" aria-hidden="true" />
          </motion.div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-lg font-bold text-white font-mono">{GITHUB_USERNAME}</h3>
            <p className="text-gray-400 text-sm mt-1">B.Sc Blockchain Technology Student at Savitribai Phule Pune University</p>
            {/* Tags: Stagger reveal, hover lift + cyan glow + scale 1.05 */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              {[
                { label: '📍 Pune, India', primary: false },
                { label: '🎓 SPPU Student', primary: false },
                { label: '⛓ Blockchain Dev', primary: true }
              ].map((tag, i) => (
                <motion.span
                  key={tag.label}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                  whileHover={{
                    y: -3,
                    scale: 1.05,
                    boxShadow: '0 0 12px rgba(0, 242, 254, 0.25)',
                    borderColor: 'rgba(0, 242, 254, 0.4)',
                    color: '#fff'
                  }}
                  className={`text-xs font-mono px-3 py-1 rounded-full border transition-all duration-300 cursor-default ${
                    tag.primary
                      ? 'text-primary bg-primary/10 border-primary/20'
                      : 'text-gray-400 bg-dark border-white/5'
                  }`}
                >
                  {tag.label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA: View Profile Button with gradient slide, icon slide 4px, glow pulse, button lift + click tap ripple scale */}
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover="btnHover"
            whileTap={{ scale: 0.95 }}
            variants={{
              btnHover: {
                y: -3,
                borderColor: 'rgba(0, 242, 254, 0.55)',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.35)',
              }
            }}
            className="github-btn flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/45 text-primary font-mono text-xs font-semibold overflow-hidden relative transition-all duration-300 focus:outline-none"
            aria-label="Visit Pratiksha Kalbhor's GitHub profile"
          >
            {/* Gradient background slide overlay */}
            <span className="github-btn-gradient" aria-hidden="true" />
            <motion.span
              variants={{
                btnHover: { scale: 1.1, rotate: [0, -5, 5, 0] }
              }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex items-center"
            >
              <FaGithub className="text-sm" aria-hidden="true" />
            </motion.span>
            <span className="relative z-10 animate-glow-pulse">View Profile</span>
            <motion.span
              variants={{
                btnHover: { x: 4 }
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="relative z-10 flex items-center"
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Repos */}
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TbGitFork className="text-primary animate-pulse" aria-hidden="true" /> Featured Repositories
          {loading && <span className="text-xs text-gray-500 font-mono">(loading live data…)</span>}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, idx) => (
            <RepoCard key={repo.name} repo={repo} idx={idx} />
          ))}
        </div>

      </div>

      <style>{`
        /* Slow-moving cyan and purple lines in background */
        .github-background-line {
          position: absolute;
          width: 200%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.08), transparent);
          pointer-events: none;
          z-index: 1;
        }
        .line-1 {
          top: 15%;
          left: -50%;
          transform: rotate(-10deg);
          animation: moveLine1 25s linear infinite;
        }
        .line-2 {
          bottom: 15%;
          left: -50%;
          transform: rotate(15deg);
          animation: moveLine2 30s linear infinite;
        }
        @keyframes moveLine1 {
          0% { transform: translateY(-40px) rotate(-10deg); opacity: 0.2; }
          50% { opacity: 0.6; }
          100% { transform: translateY(80px) rotate(-10deg); opacity: 0.2; }
        }
        @keyframes moveLine2 {
          0% { transform: translateY(40px) rotate(15deg); opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-80px) rotate(15deg); opacity: 0.2; }
        }

        /* Shine sweep hover animation for repo cards */
        .repo-card {
          position: relative;
          overflow: hidden;
        }
        .repo-card::after {
          content: '';
          position: absolute;
          top: 0; left: -150%;
          width: 60%; height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 242, 254, 0.08),
            transparent
          );
          transform: skewX(-20deg);
          transition: 0.8s ease-in-out;
          pointer-events: none;
        }
        .repo-card:hover::after {
          left: 150%;
        }

        /* Button Moving Gradient Hover overlay */
        .github-btn {
          background: rgba(13, 20, 35, 0.4);
        }
        .github-btn-gradient {
          position: absolute;
          top: 0; left: -100%;
          width: 200%; height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 242, 254, 0.12),
            rgba(168, 85, 247, 0.12),
            transparent
          );
          transition: 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }
        .github-btn:hover .github-btn-gradient {
          left: 100%;
        }
      `}</style>
    </section>
  );
};
export default GitHubSection;
