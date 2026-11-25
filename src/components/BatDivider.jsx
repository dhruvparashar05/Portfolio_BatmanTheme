import React from 'react';
import { motion } from 'framer-motion';

const BatDivider = ({ delay = 0 }) => {
  return (
    <div className="flex items-center justify-center w-full my-12 opacity-80">
      <motion.div 
        className="h-[1px] flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-bat-gold/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
      <motion.div
        className="mx-4 text-bat-gold/60 hover:text-bat-gold cursor-pointer transition-colors duration-300"
        initial={{ rotate: -10, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        whileHover={{ scale: 1.1, rotate: 180 }}
      >
        <img
          src="/batman-logo.png"
          alt="Batman Logo"
          className="w-10 h-auto object-contain opacity-75 hover:opacity-100 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] transition-opacity duration-300"
        />
      </motion.div>
      <motion.div 
        className="h-[1px] flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-bat-gold/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
    </div>
  );
};

export default BatDivider;
