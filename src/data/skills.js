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
  SiCplusplus
} from 'react-icons/si';

import { FaHardHat, FaHtml5, FaCss3Alt, FaChartBar } from 'react-icons/fa';
import { TbHexagon, TbLock } from 'react-icons/tb';

export const skillCategories = [
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: TbHexagon,
    description: 'Decentralized systems, smart contracts development, and Web3 integration mechanics.',
    skills: [
      { name: 'Solidity', level: 90, icon: SiSolidity },
      { name: 'Ethereum', level: 85, icon: SiEthereum },
      { name: 'Hardhat', level: 80, icon: FaHardHat },
      { name: 'Blockchain Fundamentals', level: 92, icon: TbLock },
      { name: 'Web3 Integration', level: 85, icon: TbHexagon }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: SiReact,
    description: 'Creating highly interactive, fluid, and responsive user experiences.',
    skills: [
      { name: 'React.js', level: 88, icon: SiReact },
      { name: 'JavaScript (ES6+)', level: 90, icon: SiJavascript },
      { name: 'Tailwind CSS', level: 92, icon: SiTailwindcss },
      { name: 'HTML5', level: 95, icon: FaHtml5 },
      { name: 'CSS3', level: 90, icon: FaCss3Alt }
    ]
  },
  {
    id: 'tools-databases',
    title: 'Languages & Databases',
    icon: SiPostgresql,
    description: 'Relational data querying, standard backend logic languages, and data analysis.',
    skills: [
      { name: 'C/C++', level: 85, icon: SiCplusplus },
      { name: 'SQL / Databases', level: 82, icon: SiPostgresql },
      { name: 'MongoDB', level: 75, icon: SiMongodb },
      { name: 'Power BI', level: 80, icon: FaChartBar },
      { name: 'Git & GitHub', level: 88, icon: SiGithub }
    ]
  }
];
