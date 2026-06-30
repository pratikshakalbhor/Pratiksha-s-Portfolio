export const projectsList = [
  {
    id: 'freelancechain',
    title: 'FreelanceChain',
    description: 'A decentralized freelancing platform securing service terms in smart escrows. Payments are holding atomically, and released upon milestone completion or decided by community judges if a dispute arises.',
    image: '/images/blockchain.png',
    features: [
      'Smart contract-based escrow system with state automation',
      'Decentralized dispute resolution with community-incentivized voting',
      'ERC-20 token support for payments allowing lower transaction fees',
      'Encrypted profile and career reputation stored on IPFS'
    ],
    tags: ['Solidity', 'React.js', 'Hardhat', 'Ethers.js', 'Web3.js'],
    github: 'https://github.com/pratiksha-kalbhor/freelance-chain',
    demo: 'https://freelancechain-dapp.vercel.app'
  },
  {
    id: 'nft-marketplace',
    title: 'DeFi NFT Marketplace',
    description: 'A modern, gas-optimized marketplace for minting, listing, buying and placing bids on NFT digital art collectibles with integrated creator royalties.',
    image: '/images/webdev.png',
    features: [
      'ERC-721 smart contract complying with OpenZeppelin security standards',
      'Integrated royalty distribution mechanism paying creators directly',
      'Time-based English auctions and fixed-price listings',
      'Metadata upload and storage structure via Pinata IPFS'
    ],
    tags: ['Solidity', 'React.js', 'Tailwind CSS', 'IPFS', 'Hardhat'],
    github: 'https://github.com/pratiksha-kalbhor/nft-marketplace-web3',
    demo: 'https://nft-marketplace-demo.vercel.app'
  },
  {
    id: 'ecochain',
    title: 'EcoChain Tracker',
    description: 'A revolutionary waste recycling and carbon offset coordinator rewarding users with EcoTokens for recorded climate-conscious actions.',
    image: '/images/powerbi.png',
    features: [
      'Interactive Web3 dashboard tracking global recycling metrics',
      'Smart tokenomics structure minting ERC-20 utility tokens as rewards',
      'Oracle integration verifying offset assertions before minting',
      'Power BI styled user analytics panel monitoring environmental impacts'
    ],
    tags: ['React.js', 'Solidity', 'Tailwind CSS', 'Power BI', 'Chainlink'],
    github: 'https://github.com/pratiksha-kalbhor/ecochain-tracker',
    demo: 'https://ecochain-tracker.vercel.app'
  },
  {
    id: 'cryptovault',
    title: 'CryptoVault MultiSig',
    description: 'An institutional-grade multi-signature wallet requiring customizable M-of-N threshold signatures with integrated smart-yield aggregators.',
    image: '/images/sql.png',
    features: [
      'Secure multi-owner wallet with time-locked fund withdrawal constraints',
      'Yield engine integrating with decentralized lending pools for compound interest',
      'Transaction monitoring console using SQL database ledger storage',
      'Meta-transaction mechanics allowing gasless transfers for end users'
    ],
    tags: ['React.js', 'Solidity', 'Ethers.js', 'SQL', 'Hardhat'],
    github: 'https://github.com/pratiksha-kalbhor/cryptovault-multisig',
    demo: 'https://crypto-vault-wallet.vercel.app'
  }
];
