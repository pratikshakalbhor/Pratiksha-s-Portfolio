import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Home from './pages/Home';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 3D Core Loader Transition */}
      <AnimatePresence mode="wait">
        {loading && (
          <Loader 
            key="pre-loader"
            finishLoading={() => setLoading(false)} 
          />
        )}
      </AnimatePresence>
      
      {/* Main Page Content */}
      <AnimatePresence mode="wait">
        {!loading && (
          <div key="master-layout" className="animate-fadeIn">
            {/* Desktop custom cursor effect trailing tracker */}
            <CustomCursor />
            
            {/* The single page container */}
            <Home />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
