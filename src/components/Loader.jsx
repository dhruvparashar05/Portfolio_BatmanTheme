import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onFinished }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-bat-black-bg z-[10000] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          {/* Subtle Bat-Signal projection in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,211,84,0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Central Logo Box */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Bat-Signal Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 mb-6 p-4 loader-bat flex items-center justify-center rounded-full border border-bat-gold/30 bg-black/40">
              <img
                src="/batman-logo.png"
                alt="Batman Logo"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_15px_rgba(247,211,84,0.5)] select-none"
              />
            </div>

            <motion.h1
              className="text-bat-gold font-bold tracking-[0.25em] text-lg md:text-xl uppercase select-none glow-text-gold text-center px-4"
              initial={{ letterSpacing: '0.1em', opacity: 0 }}
              animate={{ letterSpacing: '0.25em', opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
            >
              Welcome to the Batcave
            </motion.h1>
            <motion.div
              className="h-[1px] w-24 bg-gradient-to-r from-transparent via-bat-gold/60 to-transparent mt-2"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.p
              className="text-white/40 text-xs tracking-widest mt-2 uppercase font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Initiating Operations
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
