import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.01)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 select-none">
        
        {/* Subtle Bat Logo Divider */}
        <motion.div
          className="text-bat-gold/30 hover:text-bat-gold/60 cursor-pointer transition-colors duration-500 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
        >
          <img
            src="/batman-logo.png"
            alt="Batman Logo"
            className="w-14 h-auto object-contain opacity-45 hover:opacity-85 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.25)] transition-opacity duration-500"
          />
        </motion.div>

        {/* Famous Quote */}
        <motion.blockquote
          className="text-lg md:text-xl font-medium italic text-white/80 tracking-wide max-w-xl mb-8 leading-relaxed glow-text-gold"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          "It's not who I am underneath, but what I do that defines me."
        </motion.blockquote>

        {/* Brand Label */}
        <motion.div
          className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Copyright info */}
        <motion.p
          className="text-white/30 text-xs tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &copy; {currentYear} Dhruv Parashar. Crafted in shadows. All Rights Reserved.
        </motion.p>

      </div>
    </footer>
  );
};

export default Footer;
