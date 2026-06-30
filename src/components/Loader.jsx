import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiEthereum } from 'react-icons/si';

const Loader = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'Initializing Web3 provider handshake...',
    'Connecting Savitribai Phule University peer nodes...',
    'Resolving IPFS gateway protocol...',
    'Compiling smart contract artifacts (Solidity v0.8.20)...',
    'Decrypting personal wallet state...',
    'Consensus reached. Synchronizing portfolio ledger...'
  ];

  useEffect(() => {
    const duration = 2500; // 2.5s total loading time
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            finishLoading();
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [finishLoading]);

  // Rotate log messages based on progress
  useEffect(() => {
    if (progress < 15) setLogIndex(0);
    else if (progress < 35) setLogIndex(1);
    else if (progress < 55) setLogIndex(2);
    else if (progress < 70) setLogIndex(3);
    else if (progress < 85) setLogIndex(4);
    else setLogIndex(5);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080B11] text-gray-100"
    >
      <div className="relative flex flex-col items-center max-w-md w-11/12">
        {/* Animated Ethereum rotating logo */}
        <motion.div
          animate={{ 
            rotateY: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotateY: { repeat: Infinity, duration: 3, ease: "linear" },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="text-primary text-6xl mb-8 filter drop-shadow-[0_0_15px_rgba(0,242,254,0.6)]"
        >
          <SiEthereum />
        </motion.div>

        {/* Loading Progress Percentage */}
        <span className="text-sm font-mono text-primary tracking-widest uppercase mb-2">
          Mining Block #{Math.floor(progress * 1324)} • {Math.round(progress)}%
        </span>

        {/* Progress Bar Grid */}
        <div className="w-full bg-[#111827] h-[6px] rounded-full overflow-hidden border border-white/5 mb-4 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary via-primary-purple to-secondary rounded-full shadow-[0_0_10px_rgba(0,242,254,0.5)]"
          />
        </div>

        {/* Shifting log comments */}
        <AnimatePresence mode="wait">
          <motion.p
            key={logIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-mono text-gray-400 text-center h-4 tracking-wider italic"
          >
            &gt; {logs[logIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Decorative matrix layout grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,24,38,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.9)_1px,transparent_1px)] bg-[size:30px_30px]" />
    </motion.div>
  );
};

export default Loader;
