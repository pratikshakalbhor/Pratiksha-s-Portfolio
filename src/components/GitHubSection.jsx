import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { TbGitFork } from 'react-icons/tb';

const featuredRepos = [
  {
    name: 'ecochain',
    description: 'Blockchain-based platform for tree plantation, carbon credit tracking, and environmental transparency.',
    link: 'https://github.com/pratiksha-kalbhor/ecochain',
  },
  {
    name: 'freelance-chain',
    description: 'Decentralized freelancing platform with Solidity escrow and milestone-based payments.',
    link: 'https://github.com/pratiksha-kalbhor/freelance-chain',
  },
  {
    name: 'nft-dapp',
    description: 'Decentralized NFT application for minting, managing, and exploring NFTs on Ethereum.',
    link: 'https://github.com/pratiksha-kalbhor/nft-dapp',
  },
  {
    name: 'dataproof',
    description: 'Blockchain document verification system for secure, tamper-proof validation of digital records.',
    link: 'https://github.com/pratiksha-kalbhor/dataproof',
  },
  {
    name: 'tokenomics-contracts',
    description: 'Solidity smart contracts implementing ERC-20 tokens, staking, and reward mechanisms.',
    link: 'https://github.com/pratiksha-kalbhor/tokenomics-contracts',
  },
  {
    name: 'distributed-systems-practicals',
    description: 'University coursework covering distributed systems concepts and blockchain fundamentals.',
    link: 'https://github.com/pratiksha-kalbhor/distributed-systems-practicals',
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
          className="glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl mb-10 flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full border border-primary/40 overflow-hidden flex-shrink-0 bg-[#0B0F19] flex items-center justify-center">
            <FaGithub className="text-4xl text-gray-400" aria-hidden="true" />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-lg font-bold text-white font-mono">pratiksha-kalbhor</h3>
            <p className="text-gray-400 text-sm mt-1">B.Sc Blockchain Technology Student at Savitribai Phule Pune University</p>
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">
                📍 Pune, India
              </span>
              <span className="text-xs font-mono text-gray-400 bg-dark border border-white/5 px-3 py-1 rounded-full">
                🎓 SPPU Student
              </span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://github.com/pratiksha-kalbhor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/45 text-primary font-mono text-xs font-semibold hover:bg-primary/10 transition-all duration-300 focus:outline-none"
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
              className="glassmorphism rounded-2xl p-5 border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg flex flex-col justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View ${repo.name} repository on GitHub`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-white transition-colors duration-300 font-mono">
                  <FaGithub aria-hidden="true" /> {repo.name}
                </span>
                <FaExternalLinkAlt size={11} className="text-gray-600 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{repo.description}</p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
