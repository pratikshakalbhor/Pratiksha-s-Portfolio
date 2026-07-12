import { TbShieldCheck, TbCoins, TbNetwork } from 'react-icons/tb';
import { SiPython, SiRust } from 'react-icons/si';
import { FaHardHat } from 'react-icons/fa';

export const currentlyLearningList = [
  {
    id: 1,
    topic: 'Smart Contract Auditing',
    icon: TbShieldCheck,
    status: 'Learning',
    statusColor: '#00F2FE', // Glow cyan
    description: 'Learning smart contract auditing, vulnerability identification, and security best practices.',
  },
  {
    id: 2,
    topic: 'DeFi (Decentralized Finance)',
    icon: TbCoins,
    status: 'Learning',
    statusColor: '#a855f7', // Purple/Vibrant pink
    description: 'Exploring DeFi protocols, token standards, lending, staking, and liquidity pools.',
  },
  {
    id: 3,
    topic: 'Blockchain Interoperability',
    icon: TbNetwork,
    status: 'Learning',
    statusColor: '#05FFCC', // Neon teal
    description: 'Learning cross-chain communication, interoperability protocols, and multi-chain network design.',
  },
  {
    id: 4,
    topic: 'Python',
    icon: SiPython,
    status: 'Learning',
    statusColor: '#FFD43B', // Python yellow
    description: 'Learning Python for automation, scripting, blockchain tools, and backend development.',
  },
  {
    id: 5,
    topic: 'Rust (Basic)',
    icon: SiRust,
    status: 'Learning',
    statusColor: '#ff7733', // Rust orange
    description: 'Learning Rust fundamentals, memory safety, ownership, and basics of systems programming.',
  },
  {
    id: 6,
    topic: 'Hardhat',
    icon: FaHardHat,
    status: 'Learning',
    statusColor: '#ffb703', // Amber/Yellow
    description: 'Learning Hardhat for compiling, deploying, testing, and debugging Ethereum smart contracts.',
  },
];
