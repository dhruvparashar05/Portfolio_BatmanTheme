import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EasterEgg = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let keyBuffer = '';
    const targetString = 'imbatman';

    const handleKeyDown = (e) => {
      // Ignore modifier keys
      if (e.key.length > 1) return;

      // Add to buffer
      keyBuffer += e.key.toLowerCase();
      
      // Clean buffer (remove characters that are not alphabetic)
      const cleanBuffer = keyBuffer.replace(/[^a-z]/g, '');

      // Keep buffer length within a reasonable limit
      if (cleanBuffer.length > 20) {
        keyBuffer = cleanBuffer.slice(-20);
      }

      // Check if ends with 'imbatman'
      if (cleanBuffer.endsWith(targetString)) {
        setIsActive(true);
        keyBuffer = ''; // Reset buffer
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // Generate some bats for the swarm animation
  const batsCount = 18;
  const bats = Array.from({ length: batsCount }).map((_, i) => ({
    id: i,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    angle: Math.random() * 360,
    scale: 0.3 + Math.random() * 0.7,
  }));

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[10001] bg-black/95 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient flashing sky with thunder-like visual pulses */}
          <motion.div
            className="absolute inset-0 bg-yellow-500/5 pointer-events-none"
            animate={{
              opacity: [0.1, 0.4, 0.2, 0.5, 0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Sweeping searchlight */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(247,211,84,0.12)_0%,transparent_70%)] pointer-events-none"
            animate={{
              x: [-200, 200, -100, 100, -200],
              y: [-150, 150, 100, -100, -150],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* The giant Bat-Signal projection */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Projector cone light effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(247,211,84,0.08)_0%,transparent_60%)] border border-bat-gold/10" />

            {/* Glowing signal logo */}
            <img
              src="/batman-logo.png"
              alt="Bat-Signal"
              className="w-64 md:w-80 h-auto object-contain filter drop-shadow-[0_0_40px_rgba(247,211,84,0.7)] select-none"
            />

            {/* Huge glowing title text */}
            <motion.h2
              className="text-bat-gold font-bold text-4xl md:text-6xl uppercase tracking-[0.3em] mt-8 glow-text-gold select-none text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              I'M BATMAN
            </motion.h2>

            <motion.p
              className="text-white/60 text-sm font-light italic tracking-wider mt-4 text-center max-w-md select-none px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              "It's not who I am underneath, but what I do that defines me."
            </motion.p>
          </motion.div>

          {/* Flying bats swarm */}
          {bats.map((bat) => {
            const rad = (bat.angle * Math.PI) / 180;
            const xDest = Math.cos(rad) * 900;
            const yDest = Math.sin(rad) * 900;

            return (
              <motion.div
                key={bat.id}
                className="absolute text-white/40 pointer-events-none fill-current"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.1,
                  opacity: 0,
                  rotate: bat.angle,
                }}
                animate={{
                  x: xDest,
                  y: yDest,
                  scale: bat.scale * 2.5,
                  opacity: [0, 0.8, 0.8, 0],
                  rotate: bat.angle + (Math.random() * 40 - 20),
                }}
                transition={{
                  delay: bat.delay,
                  duration: bat.duration,
                  ease: 'easeOut',
                }}
              >
                {/* SVG for a simple bat silhouette */}
                <svg viewBox="0 0 24 24" className="w-8 h-8 select-none">
                  <path d="M12 6c.5 0 1-1.5 1-2.5 0-.2.2-.5.5-.5 1.5 0 2.5 1.5 4.5 1.5 2 0 4-2 4-4.5 0-4.5-5-11.5-10-13.5-5 2-10 9-10 13.5 0 2.5 2 4.5 4 4.5 2 0 3-1.5 4.5-1.5.3 0 .5.3.5.5 0 1 .5 2.5 1 2.5z" />
                </svg>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
