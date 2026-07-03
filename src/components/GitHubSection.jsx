import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { TbGitFork } from 'react-icons/tb';

const featuredRepos = [
  {
    name: 'freelance-chain',
    description: 'Decentralized freelancing platform with Solidity escrow contracts and community dispute resolution.',
    language: 'Solidity',
    languageColor: '#AA6746',
    stars: 0,
    forks: 0,
    link: 'https://github.com/pratiksha-kalbhor/freelance-chain',
    topics: ['solidity', 'hardhat', 'react', 'ethers-js'],
  },
  {
    name: 'nft-marketplace-web3',
    description: 'Gas-optimised NFT marketplace supporting ERC-721 minting, fixed-price listings, and on-chain royalties.',
    language: 'Solidity',
    languageColor: '#AA6746',
    stars: 0,
    forks: 0,
    link: 'https://github.com/pratiksha-kalbhor/nft-marketplace-web3',
    topics: ['nft', 'erc721', 'ipfs', 'react'],
  },
  {
    name: 'ecochain-tracker',
    description: 'Web3 eco-reward system using Chainlink oracles to verify off-chain data before minting ERC-20 tokens.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    forks: 0,
    link: 'https://github.com/pratiksha-kalbhor/ecochain-tracker',
    topics: ['chainlink', 'erc20', 'react', 'tailwindcss'],
  },
  {
    name: 'cryptovault-multisig',
    description: 'M-of-N multi-signature wallet with configurable thresholds, time-locked withdrawals, and an SQL audit trail.',
    language: 'Solidity',
    languageColor: '#AA6746',
    stars: 0,
    forks: 0,
    link: 'https://github.com/pratiksha-kalbhor/cryptovault-multisig',
    topics: ['multisig', 'solidity', 'ethers-js', 'sql'],
  },
];

const GitHubSection = () => {
  return (
    <section id="github" aria-labelledby="github-heading" className="py-24 relative overflow-hidden bg-dark">
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
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">OPEN SOURCE · CODE REPOSITORIES</p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl mb-10 flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full border-2 border-primary/40 shadow-[0_0_20px_rgba(0,242,254,0.2)] overflow-hidden flex-shrink-0 bg-[#111827] flex items-center justify-center">
            <FaGithub className="text-5xl text-gray-500" aria-hidden="true" />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-xl font-bold text-white">pratiksha-kalbhor</h3>
            <p className="text-gray-400 text-sm mt-1">B.Sc Blockchain Technology student · Solidity · React · Hardhat</p>
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">
                📍 Pune, Maharashtra
              </span>
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">
                🎓 SPPU — Blockchain Technology
              </span>
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">
                ⚡ Web3 Developer
              </span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://github.com/pratiksha-kalbhor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 text-primary font-mono text-sm font-semibold hover:bg-primary/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Visit Pratiksha Kalbhor's GitHub profile"
          >
            <FaGithub aria-hidden="true" /> View Profile
          </a>
        </motion.div>

        {/* Featured Repositories */}
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TbGitFork className="text-primary" aria-hidden="true" /> Featured Repositories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredRepos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
              whileHover={{ y: -4 }}
              className="glassmorphism rounded-2xl p-5 border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg flex flex-col justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View ${repo.name} repository on GitHub`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-white transition-colors duration-300 font-mono">
                    <FaGithub aria-hidden="true" /> {repo.name}
                  </span>
                  <FaExternalLinkAlt size={11} className="text-gray-600 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{repo.description}</p>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: repo.languageColor }} aria-hidden="true" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1"><FaStar size={10} aria-hidden="true" /> {repo.stars}</span>
                <span className="flex items-center gap-1"><FaCodeBranch size={10} aria-hidden="true" /> {repo.forks}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {repo.topics.map((topic) => (
                  <span key={topic} className="text-[10px] font-mono bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
