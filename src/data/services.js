import { TbHexagon, TbCode, TbLink, TbLayout } from 'react-icons/tb';

export const servicesList = [
  {
    id: 1,
    title: 'Smart Contract Development',
    description:
      'Writing secure, gas-optimised Solidity contracts for escrow systems, token standards (ERC-20, ERC-721), staking pools, and DAO governance.',
    icon: TbHexagon,
    points: [
      'ERC-20 & ERC-721 token contracts',
      'Escrow and payment logic',
      'Security-first development practices',
      'Testnet + Mainnet deployment',
    ],
  },
  {
    id: 2,
    title: 'React Frontend Development',
    description:
      'Building modern, responsive web applications using React, Vite, and Tailwind CSS with clean component architecture and smooth Framer Motion animations.',
    icon: TbCode,
    points: [
      'Responsive single-page applications',
      'Component-based architecture',
      'Framer Motion animations',
      'Performance-optimised builds',
    ],
  },
  {
    id: 3,
    title: 'Web3 Integration',
    description:
      'Connecting React frontends to Ethereum smart contracts using Ethers.js and Web3.js, with MetaMask wallet authentication and real-time transaction feedback.',
    icon: TbLink,
    points: [
      'MetaMask & WalletConnect integration',
      'Ethers.js / Web3.js contract calls',
      'Transaction status UX flows',
      'IPFS file upload via Pinata',
    ],
  },
  {
    id: 4,
    title: 'DApp UI Development',
    description:
      'Designing and coding blockchain-themed user interfaces that communicate complex on-chain data intuitively — dashboards, transaction tables, and token UIs.',
    icon: TbLayout,
    points: [
      'Custom blockchain dashboards',
      'Wallet state management',
      'Real-time event listeners',
      'Dark mode, accessible UI',
    ],
  },
];
