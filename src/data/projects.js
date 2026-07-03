export const projectsList = [
  {
    id: 'freelancechain',
    title: 'FreelanceChain',
    overview:
      'A decentralized freelancing platform where service agreements are encoded in Solidity escrow contracts. Clients fund milestones upfront; funds are released automatically upon completion or resolved via a community voting mechanism if a dispute arises.',
    image: '/images/blockchain.png',
    features: [
      'Solidity escrow contract with milestone-based state machine',
      'Community dispute resolution with weighted voting',
      'ERC-20 token payment support',
      'IPFS-based profile storage via Pinata',
    ],
    challenges: [
      'Designing a gas-efficient stateful escrow with re-entrancy guards',
      'Implementing a fair voting mechanism resistant to Sybil attacks',
    ],
    learned: [
      'Deepened understanding of Solidity security patterns (CEI, pull payments)',
      'Practical use of Hardhat testing and deployment pipelines',
    ],
    tags: ['Solidity', 'React.js', 'Hardhat', 'Ethers.js', 'IPFS'],
    github: 'https://github.com/pratiksha-kalbhor/freelance-chain',
    demo: 'https://freelancechain-dapp.vercel.app',
  },
  {
    id: 'nft-marketplace',
    title: 'DeFi NFT Marketplace',
    overview:
      'A gas-optimised NFT marketplace for minting, listing, and auctioning digital art. Creators receive royalties automatically on every secondary sale via an on-chain royalty registry.',
    image: '/images/webdev.png',
    features: [
      'ERC-721 contract built on OpenZeppelin standards',
      'On-chain royalty registry for creator payouts',
      'Fixed-price listings and time-based English auctions',
      'Metadata pinned via Pinata IPFS',
    ],
    challenges: [
      'Minimising gas costs when minting batches of NFTs',
      'Handling auction edge-cases such as bid sniping near deadline',
    ],
    learned: [
      'ERC-721 and ERC-2981 royalty standards in depth',
      'Auction mechanics and timing vulnerabilities in Solidity',
    ],
    tags: ['Solidity', 'React.js', 'Tailwind CSS', 'IPFS', 'Hardhat'],
    github: 'https://github.com/pratiksha-kalbhor/nft-marketplace-web3',
    demo: 'https://nft-marketplace-demo.vercel.app',
  },
  {
    id: 'ecochain',
    title: 'EcoChain Tracker',
    overview:
      'A Web3 application that rewards verified eco-friendly actions with ERC-20 EcoTokens. Users log recycling and carbon-offset activities; a Chainlink oracle verifies claims before tokens are minted.',
    image: '/images/powerbi.png',
    features: [
      'ERC-20 token with controlled minting via oracle assertion',
      'Chainlink integration for off-chain data verification',
      'Interactive React dashboard displaying personal eco-impact',
      'Analytics panel built with recharts for activity trends',
    ],
    challenges: [
      'Integrating Chainlink oracle responses with contract state securely',
      'Preventing duplicate reward claims for the same activity',
    ],
    learned: [
      'Oracle request/response pattern and trust model in smart contracts',
      'Building event-driven UIs that react to on-chain transaction confirmations',
    ],
    tags: ['React.js', 'Solidity', 'Chainlink', 'Tailwind CSS', 'Ethers.js'],
    github: 'https://github.com/pratiksha-kalbhor/ecochain-tracker',
    demo: 'https://ecochain-tracker.vercel.app',
  },
  {
    id: 'cryptovault',
    title: 'CryptoVault MultiSig',
    overview:
      'An M-of-N multi-signature wallet contract designed for shared fund management. Transactions require a configurable threshold of owner signatures before execution, providing institutional-grade access control.',
    image: '/images/sql.png',
    features: [
      'Configurable M-of-N signature threshold on deployment',
      'Time-locked withdrawal queue for large transactions',
      'Owner management: add/remove signers via majority vote',
      'Transaction log stored in a PostgreSQL audit ledger',
    ],
    challenges: [
      'Ensuring atomic execution and preventing partial state updates',
      'Designing a UI that clearly communicates pending signature status',
    ],
    learned: [
      'Multi-signature patterns and access-control best practices in Solidity',
      'Combining off-chain SQL logs with on-chain event indexing',
    ],
    tags: ['React.js', 'Solidity', 'Ethers.js', 'SQL', 'Hardhat'],
    github: 'https://github.com/pratiksha-kalbhor/cryptovault-multisig',
    demo: 'https://crypto-vault-wallet.vercel.app',
  },
];
