import {
  SiSolidity,
  SiEthereum,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiMongodb,
  SiPostman,
  SiWeb3Dotjs,
  SiVite,
  SiGo,
  SiRust,
} from 'react-icons/si';

import { FaHardHat, FaCss3Alt, FaHtml5, FaDatabase } from 'react-icons/fa';
import { TbHexagon, TbLock, TbWallet, TbServer, TbLayout } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';

export const skillCategories = [
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: TbHexagon,
    description: 'Building decentralized systems and smart contract logic on EVM-compatible chains.',
    skills: [
      { name: 'Solidity (Basic)', icon: SiSolidity },
      { name: 'Ethereum', icon: SiEthereum },
      { name: 'Smart Contracts', icon: TbLock },
      { name: 'Hardhat', icon: FaHardHat },
      { name: 'Ethers.js', icon: TbHexagon },
      { name: 'Web3.js', icon: SiWeb3Dotjs },
      { name: 'IPFS', icon: TbServer },
      { name: 'MetaMask Integration', icon: TbWallet },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: SiReact,
    description: 'Crafting responsive, interactive UIs with modern frameworks and CSS tooling.',
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'JavaScript (ES6+)', icon: SiJavascript },
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Responsive Design', icon: TbLayout },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: FaDatabase,
    description: 'Designing schemas and querying data with SQL and NoSQL database systems.',
    skills: [
      { name: 'SQL', icon: FaDatabase },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: SiGithub,
    description: 'Developer tooling, version control, and API testing platforms.',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: VscCode },
      { name: 'Postman', icon: SiPostman },
      { name: 'Power BI', icon: TbHexagon },
    ],
  },
  {
    id: 'learning',
    title: 'Learning',
    icon: TbHexagon,
    description: 'Technologies I am currently exploring and building proficiency in.',
    skills: [
      { name: 'Go', icon: SiGo },
      { name: 'Rust', icon: SiRust },
      { name: 'Hyperledger Fabric', icon: TbServer },
      { name: 'Corda', icon: TbHexagon },
    ],
  },
];
