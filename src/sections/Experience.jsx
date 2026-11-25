import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: 'RAG Pipelines & LLM Training',
      organization: 'Generative AI in JavaScript',
      period: '2026 - Present',
      details: 'Completed specialized coursework in Generative AI with JavaScript, designing Retrieval-Augmented Generation (RAG) pipelines, document chunking, vector embeddings, and semantic search workflows. Hands-on with LLM fine-tuning fundamentals, structured prompting, and integrating intelligent AI agents into web applications.'
    },
    {
      role: 'Full Stack Developer',
      organization: 'Independent & Hackathon Builds',
      period: '2025 - Present',
      details: 'Architecting and shipping end-to-end web applications using React, JavaScript, Node.js, Tailwind CSS, and Firebase. Focused on responsive frontend engineering, backend API integration, real-time state management, and deploying scalable full-stack AI products.'
    },
    {
      role: 'Event Management Sub Head',
      organization: 'GDG on Campus IPEC',
      period: '2025 - Present',
      details: 'Heading coordination logistics, workshop operations, and team execution. Actively managed community setups, tech speaker sessions, and promotional schedules for campus builders.'
    },
    {
      role: 'Community Member',
      organization: 'Google Developer Groups',
      period: '2024 - Present',
      details: 'Consistently attending tech talks, contributing to hackathons, learning cloud integrations, and participating in networking setups for peer developer communities.'
    }
  ];

  return (
    <section id="experience" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Experience & <span className="text-bat-gold glow-text-gold">Leadership</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-bat-gold/20 ml-4 md:ml-12 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
            >
              {/* Timeline Glow Indicator Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-bat-black-bg border-2 border-bat-gold flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)] z-20">
                {/* Center dot inside node */}
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-bat-yellow" />
              </div>

              {/* Glass Card Details */}
              <div className="glass-card p-6 relative group overflow-hidden">
                {/* Horizontal Gold Line Accent */}
                <div className="absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b from-bat-gold/0 via-bat-gold/40 to-bat-gold/0 group-hover:via-bat-gold transition-all duration-300" />

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-1">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-bat-gold transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <span className="text-xs md:text-sm font-semibold text-bat-yellow uppercase tracking-widest">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-sm font-medium text-white/50 mb-4 tracking-wide uppercase">
                  {exp.organization}
                </h4>

                <p className="text-white/60 text-sm leading-relaxed">
                  {exp.details}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
