import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Components
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import BatDivider from './components/BatDivider';
import EasterEgg from './components/EasterEgg';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import CodingJourney from './sections/CodingJourney';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Hooks
import { useMousePosition } from './hooks/useMousePosition';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress bar config
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track mouse coordinates for background spotlight
  useMousePosition();

  // Scroll handler for navbar links
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Coding Journey', id: 'coding-journey' },
    { name: 'Experience', id: 'experience' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <Loader onFinished={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div 
          className="relative min-h-screen bg-bat-black-bg text-white font-sans overflow-x-hidden selection:bg-bat-gold/30 selection:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Fixed viewport spotlight overlay (avoids full-page repaint on mouse move) */}
          <div className="fixed inset-0 pointer-events-none z-[999] spotlight-bg" />
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-bat-gold to-bat-yellow z-[9999] origin-left shadow-yellow-glow"
            style={{ scaleX }}
          />

          {/* Premium Custom Cursor */}
          <CustomCursor />

          {/* Keypress Easter Egg Overlay */}
          <EasterEgg />

          {/* Floating Glassmorphic Navbar */}
          <motion.header 
            className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl h-16 rounded-full border border-white/5 bg-bat-black-card/60 backdrop-blur-md z-[1000] flex items-center justify-between px-6 md:px-8 shadow-lg hover:border-bat-gold/20 transition-all duration-300"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Brand Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/batman-logo.png"
                alt="Batman Logo"
                className="w-10 h-auto object-contain filter drop-shadow-[0_0_6px_rgba(212,175,55,0.45)] group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-bold text-sm md:text-base tracking-[0.2em] uppercase text-white group-hover:text-bat-gold transition-colors duration-300">
                DP
              </span>
            </div>

            {/* Desktop Navigation links */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[10px] lg:text-[11px] xl:text-xs uppercase font-bold tracking-wider text-white/60 hover:text-bat-gold hover:glow-text-gold transition-all duration-300 whitespace-nowrap"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* CTA Contact Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-full border border-bat-gold/40 text-bat-gold text-[10px] lg:text-xs font-bold uppercase tracking-wider hover:bg-bat-gold hover:text-black transition-all duration-300 shadow-gold-glow whitespace-nowrap"
            >
              Hire Me
            </button>
          </motion.header>

          {/* Page Sections */}
          <main>
            <Hero />
            
            <About />
            <BatDivider delay={0.1} />
            
            <Skills />
            <BatDivider delay={0.1} />
            
            <Projects />
            <BatDivider delay={0.1} />
            
            <CodingJourney />
            <BatDivider delay={0.1} />
            
            <Experience />
            <BatDivider delay={0.1} />
            
            <Achievements />
            <BatDivider delay={0.1} />
            
            <Certifications />
            <BatDivider delay={0.1} />
            
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
