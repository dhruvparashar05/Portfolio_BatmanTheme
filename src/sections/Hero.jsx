import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Full Stack Developer',
    'Gen AI & RAG Engineer',
    'LLM & AI Enthusiast',
    'Hackathon Builder'
  ];

  // Particle Canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars / Particles
    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        up: Math.random() > 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 211, 84, ${p.opacity})`; // Yellow glow
        ctx.fill();

        // Move upward
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        // Pulse opacity
        if (p.up) {
          p.opacity += p.pulseSpeed;
          if (p.opacity >= 0.9) p.up = false;
        } else {
          p.opacity -= p.pulseSpeed;
          if (p.opacity <= 0.2) p.up = true;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const delayBetweenRoles = 2000;

    if (!isDeleting && typedText === currentFullText) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenRoles);
    } else if (isDeleting && typedText === '') {
      // Pause at empty, move to next
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setTypedText((prev) =>
          isDeleting
            ? currentFullText.substring(0, prev.length - 1)
            : currentFullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Magnetic/Interactive Button Action
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-bat-black-bg overflow-hidden pt-16">
      {/* Background Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Ambient background glow (subtle Bat-Signal representation) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(247,211,84,0.025)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center select-none">

        {/* Subtle bat signal emblem above title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4"
        >
          <img
            src="/batman-logo.png"
            alt="Batman Logo"
            className="w-14 md:w-16 h-auto object-contain opacity-85 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]"
          />
        </motion.div>

        {/* Hello Tag */}
        <motion.p
          className="text-bat-gold font-semibold tracking-[0.25em] text-xs md:text-sm uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to the Shadow Work
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-8xl font-extrabold text-white tracking-tight mb-4 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Dhruv <span className="text-transparent bg-clip-text bg-gradient-to-r from-bat-gold via-bat-yellow to-bat-gold glow-text-gold">Parashar</span>
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.div
          className="h-10 mb-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-xl md:text-2xl text-white/80 font-medium tracking-wide typing-cursor">
            {typedText}
          </span>
        </motion.div>

        {/* Intro */}
        <motion.p
          className="text-white/60 max-w-2xl text-sm md:text-base leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          I build scalable full-stack web applications, Generative AI &amp; RAG pipelines, and intelligent LLM-powered products that solve real-world problems.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => handleScroll('projects')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-bat-gold to-bat-yellow text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-yellow-glow"
          >
            View Projects
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume Download Triggered! (Simulated)");
            }}
            className="px-6 py-3 rounded-full border border-bat-gold/40 bg-bat-black-card/40 backdrop-blur text-bat-gold font-semibold text-sm hover:bg-bat-gold/10 hover:border-bat-gold transition-all duration-300"
          >
            Download Resume
          </a>

          <button
            onClick={() => handleScroll('contact')}
            className="px-6 py-3 rounded-full bg-transparent border border-white/10 hover:border-white/40 text-white font-semibold text-sm transition-all duration-300"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Bottom Gotham Skyline Silhouette Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 250"
          className="w-full h-auto translate-y-[2px] text-bat-black-bg fill-current opacity-80"
          preserveAspectRatio="none"
        >
          <path d="M0,250 L1440,250 L1440,150 L1400,160 L1370,120 L1350,140 L1320,80 L1300,110 L1260,60 L1240,90 L1200,40 L1180,80 L1150,70 L1120,120 L1080,70 L1040,140 L1010,90 L980,110 L950,50 L920,80 L880,30 L850,90 L820,60 L780,120 L750,80 L720,110 L680,50 L640,90 L610,30 L580,70 L550,55 L520,110 L480,60 L440,130 L400,80 L370,110 L340,40 L310,80 L280,65 L240,120 L200,70 L170,100 L140,45 L110,80 L80,30 L40,90 L0,50 Z" />

          {/* Subtle outline highlight of the skyline in gold */}
          <path
            d="M0,50 L40,90 L80,30 L110,80 L140,45 L170,100 L200,70 L240,120 L280,65 L310,80 L340,40 L370,110 L400,80 L440,130 L480,60 L520,110 L550,55 L580,70 L610,30 L640,90 L680,50 L720,110 L750,80 L780,120 L820,60 L850,90 L880,30 L920,80 L950,50 L980,110 L1010,90 L1040,140 L1080,70 L1120,120 L1150,70 L1180,80 L1200,40 L1240,90 L1260,60 L1300,110 L1320,80 L1350,140 L1370,120 L1400,160 L1440,150"
            fill="none"
            stroke="url(#skyline-glow)"
            strokeWidth="2"
          />

          <defs>
            <linearGradient id="skyline-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.05)" />
              <stop offset="30%" stopColor="rgba(212,175,55,0.3)" />
              <stop offset="50%" stopColor="rgba(247,211,84,0.4)" />
              <stop offset="70%" stopColor="rgba(212,175,55,0.3)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.05)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Down arrow scroll helper */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20 text-white/30 hover:text-bat-gold transition-colors duration-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => handleScroll('about')}
      >
        <FaChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default Hero;
