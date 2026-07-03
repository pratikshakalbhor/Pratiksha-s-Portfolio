import { SiSolidity, SiNodedotjs } from 'react-icons/si';
import { TbShieldLock, TbKey, TbCode } from 'react-icons/tb';
import { FaFlask, FaVial } from 'react-icons/fa';

export const currentlyLearningList = [
  {
    id: 1,
    topic: 'Solidity Security Patterns',
    description: 'Studying re-entrancy, integer overflow, front-running, and common EVM attack vectors through the Damn Vulnerable DeFi challenges.',
    icon: TbShieldLock,
    status: 'In Progress',
    statusColor: '#00F2FE',
  },
  {
    id: 2,
    topic: 'Hardhat Advanced Testing',
    description: 'Writing comprehensive unit and integration test suites using Hardhat, Chai, and Waffle to ensure contract correctness before deployment.',
    icon: FaVial,
    status: 'In Progress',
    statusColor: '#00F2FE',
  },
  {
    id: 3,
    topic: 'Foundry Framework',
    description: 'Exploring Foundry as an alternative to Hardhat for faster fuzz testing, property-based testing, and gas profiling in Solidity.',
    icon: FaFlask,
    status: 'Exploring',
    statusColor: '#7928CA',
  },
  {
    id: 4,
    topic: 'Node.js Backend',
    description: 'Building RESTful APIs with Node.js and Express to complement DApp frontends with off-chain data indexing and wallet authentication flows.',
    icon: SiNodedotjs,
    status: 'In Progress',
    statusColor: '#00F2FE',
  },
  {
    id: 5,
    topic: 'Web3 Authentication',
    description: 'Implementing wallet-based sign-in (Sign-In with Ethereum / SIWE) and JWT session management for DApp user authentication.',
    icon: TbKey,
    status: 'Exploring',
    statusColor: '#7928CA',
  },
  {
    id: 6,
    topic: 'Smart Contract Testing',
    description: 'Investigating coverage reports, mock contracts, and fork-testing mainnet state locally to verify DeFi integrations before going live.',
    icon: TbCode,
    status: 'Planned',
    statusColor: '#A855F7',
  },
];
