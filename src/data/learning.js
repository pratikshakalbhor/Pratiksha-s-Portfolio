import { TbShieldCheck, TbCoins, TbNetwork } from 'react-icons/tb';
import { SiPython, SiReact, SiSolidity, SiEthereum } from 'react-icons/si';
import { FaHardHat } from 'react-icons/fa';

export const currentlyLearningList = [
  {
    id: 1,
    topic: 'React.js',
    icon: SiReact,
    status: 'Learning',
    statusColor: '#00F2FE', // Glow cyan/teal
    description: 'Building modular, state-driven user interfaces and frontend applications for decentralized protocols.',
  },
  {
    id: 2,
    topic: 'Python (Basic)',
    icon: SiPython,
    status: 'Learning',
    statusColor: '#FFD43B', // Python yellow
    description: 'Learning Python syntax, object-oriented concepts, and basic automation or scripting.',
  },
  {
    id: 3,
    topic: 'Solidity (Advanced)',
    icon: SiSolidity,
    status: 'Learning',
    statusColor: '#A855F7', // Ethereum/Solidity purple
    description: 'Deepening mechanics of gas optimization, advanced security design patterns, and upgradability architectures.',
  },
  {
    id: 4,
    topic: 'Ethereum',
    icon: SiEthereum,
    status: 'Learning',
    statusColor: '#627EEA', // Ethereum blue
    description: 'Studying virtual machine internals, execution logic, client clients, block construction, and gas fees.',
  },
  {
    id: 5,
    topic: 'Hardhat',
    icon: FaHardHat,
    status: 'Learning',
    statusColor: '#F5A623', // Hardhat yellow/orange
    description: 'Deploying, testing, and debugging smart contracts locally using standard developer workflows.',
  },
  {
    id: 6,
    topic: 'Smart Contract Auditing',
    icon: TbShieldCheck,
    status: 'Learning',
    statusColor: '#00F2FE', // Glow cyan
    description: 'Learning smart contract auditing, vulnerability identification, and security best practices.',
  },
  {
    id: 7,
    topic: 'DeFi',
    icon: TbCoins,
    status: 'Learning',
    statusColor: '#a855f7', // Purple/Vibrant pink
    description: 'Exploring DeFi protocols, token standards, lending, staking, and liquidity pools.',
  },
  {
    id: 8,
    topic: 'Blockchain Interoperability',
    icon: TbNetwork,
    status: 'Learning',
    statusColor: '#05FFCC', // Neon teal
    description: 'Learning cross-chain communication, interoperability protocols, and multi-chain network design.',
  },
];
