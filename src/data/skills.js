import {
  SiSolidity,
  SiEthereum,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiMongodb,
  SiPostman,
  SiFigma,
  SiWeb3Dotjs,
} from 'react-icons/si';

import { FaHardHat, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { TbHexagon, TbLock } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';

export const skillCategories = [
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: TbHexagon,
    description: 'Building decentralized systems and smart contract logic on EVM-compatible chains.',
    skills: [
      { name: 'Solidity', icon: SiSolidity },
      { name: 'Ethereum', icon: SiEthereum },
      { name: 'Hardhat', icon: FaHardHat },
      { name: 'Ethers.js', icon: TbHexagon },
      { name: 'Web3.js', icon: TbHexagon },
      { name: 'Smart Contracts', icon: TbLock },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: SiReact,
    description: 'Crafting responsive, interactive UIs with modern frameworks and CSS tooling.',
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: SiPostgresql,
    description: 'Designing schemas and querying data with SQL and NoSQL database systems.',
    skills: [
      { name: 'SQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    icon: SiGithub,
    description: 'Developer tooling, version control, and design collaboration platforms.',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: VscCode },
      { name: 'Postman', icon: SiPostman },
      { name: 'Figma', icon: SiFigma },
    ],
  },
];
