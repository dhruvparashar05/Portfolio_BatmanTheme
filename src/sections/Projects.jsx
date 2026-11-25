import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'NEXUSOPS AI',
      description: 'AI-powered operations copilot for gaming communities and event teams. Helps schedule, coordinate, and moderate community actions dynamically.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      image: '/nexusops.png',
      github: 'https://github.com/dhruvparashar05/NexusOps-AI',
      live: 'https://nexus-ops-ai.vercel.app/'
    },
    {
      title: 'Mind Mosaic',
      description: 'Mental wellness and journaling platform. Features a smart sentiment-analyzing AI Chatbot companion and aesthetic custom mood trackers.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Framer Motion'],
      image: '/mindmosaic.png',
      github: 'https://github.com/dhruvparashar05/MindMosaic',
      live: 'https://mind-mosaic-alpha.vercel.app'
    },
    {
      title: 'SmartFlow AI',
      description: 'AI-powered Water Quality and Leak Detection System. Employs advanced machine learning models to analyze telemetry data for leakage and contamination.',
      tech: ['Python', 'Machine Learning', 'Streamlit', 'SciKit-Learn'],
      image: '/smartflow.png',
      github: 'https://github.com/dhruvparashar05/SmartFlow-AI'
    },
    {
      title: 'SahayetaApp',
      description: 'Emergency response and crisis management platform connecting local volunteers and resources directly with citizens in disaster zones.',
      tech: ['React', 'Firebase', 'Google Maps API', 'CSS Grid'],
      image: '/sahayeta.png',
      github: '#',
      live: '#'
    }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.025)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="text-bat-gold glow-text-gold">Projects</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="glass-card flex flex-col group relative overflow-hidden h-full"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              onMouseMove={handleMouseMove}
            >
              {/* Dynamic mouse spotlight effect inside the card */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(247, 211, 84, 0.08), transparent 80%)'
                }}
              />

              {/* Corner Gold Highlights */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-bat-gold/0 group-hover:via-bat-gold/30 to-transparent transition-all duration-500 pointer-events-none z-20" />

              {/* Project Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/50 border-b border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out select-none"
                  draggable="false"
                />
                
                {/* Tech Badge Overlays */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-20">
                  {project.tech.map((badge, bIdx) => (
                    <span 
                      key={bIdx} 
                      className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-black/80 border border-white/10 text-white/90"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-1 justify-between relative z-20">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-bat-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Card CTA Links */}
                <div className="flex gap-4 items-center">
                  {project.github && (
                    <a
                      href={project.github}
                      target={project.github === '#' ? undefined : "_blank"}
                      rel={project.github === '#' ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (project.github === '#') {
                          e.preventDefault();
                          alert(`${project.title} GitHub repository will open here!`);
                        }
                      }}
                      className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-white/70 hover:text-bat-gold transition-colors duration-300"
                    >
                      <FaGithub className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target={project.live === '#' ? undefined : "_blank"}
                      rel={project.live === '#' ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (project.live === '#') {
                          e.preventDefault();
                          alert(`Launching live demonstration of ${project.title}!`);
                        }
                      }}
                      className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-white/70 hover:text-bat-gold transition-colors duration-300"
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
