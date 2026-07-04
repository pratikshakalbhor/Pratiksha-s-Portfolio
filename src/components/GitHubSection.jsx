import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaCircle } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';

const GITHUB_USERNAME = 'pratiksha-kalbhor';

const REPO_NAMES = [
  'ecochain',
  'freelance-chain',
  'nft-dapp',
  'dataproof',
  'tokenomics-contracts',
  'distributed-systems-practicals',
];

const LANGUAGE_COLORS = {
  Solidity:   '#AA6746',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python:     '#3572A5',
  HTML:       '#E44B23',
  CSS:        '#563D7C',
  Rust:       '#DEA584',
  Go:         '#00ADD8',
  default:    '#8B949E',
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, type: 'spring', stiffness: 100, damping: 15 }}
      whileHover={{ y: -5, boxShadow: '0 0 22px rgba(0, 242, 254, 0.18)', borderColor: 'rgba(0, 242, 254, 0.35)' }}
      className="glassmorphism rounded-2xl p-5 border border-white/5 transition-all duration-300 shadow-lg flex flex-col justify-between gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ minHeight: '140px' }}
      aria-label={`View ${repo.name} repository on GitHub`}
    >
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-white transition-colors duration-300 font-mono">
          <FaGithub aria-hidden="true" /> {repo.name}
        </span>
        <FaExternalLinkAlt size={11} className="text-gray-600 group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
      </div>

      <p className="text-gray-400 text-xs leading-relaxed flex-grow">{repo.description}</p>

      {/* Meta row */}
      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
            <FaCircle size={9} style={{ color: langColor }} aria-hidden="true" />
            {repo.language}
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
        // Fetch all public repos at once — avoids 404s from individual private/missing repos
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
      {/* Glow orbs */}
      <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="github-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            <span className="text-primary text-glow-cyan">GitHub</span> Profile
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-6 tracking-widest font-mono">OPEN SOURCE · CODE REPOSITORIES</p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl mb-10 flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full border-2 border-primary/40 overflow-hidden flex-shrink-0 bg-[#0B0F19] flex items-center justify-center shadow-[0_0_12px_rgba(0,242,254,0.3)]">
            <FaGithub className="text-4xl text-gray-400" aria-hidden="true" />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-lg font-bold text-white font-mono">{GITHUB_USERNAME}</h3>
            <p className="text-gray-400 text-sm mt-1">B.Sc Blockchain Technology Student at Savitribai Phule Pune University</p>
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">📍 Pune, India</span>
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">🎓 SPPU Student</span>
              <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">⛓ Blockchain Dev</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/45 text-primary font-mono text-xs font-semibold hover:bg-primary/10 transition-all duration-300 focus:outline-none"
            aria-label="Visit Pratiksha Kalbhor's GitHub profile"
          >
            <FaGithub aria-hidden="true" /> View Profile
          </a>
        </motion.div>

        {/* Repos */}
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TbGitFork className="text-primary" aria-hidden="true" /> Featured Repositories
          {loading && <span className="text-xs text-gray-500 font-mono">(loading live data…)</span>}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, idx) => (
            <RepoCard key={repo.name} repo={repo} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
