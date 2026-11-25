import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { value: '2+ Years', label: 'Learning & Building' },
    { value: '10+ Projects', label: 'Created' },
    { value: '20+ Hackathons', label: 'Participated' },
    { value: 'Multiple', label: 'Events Organized' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Light glow in the background */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-bat-gold glow-text-gold">Me</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Profile Picture Visual */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group max-w-[320px] w-full">
              {/* Outer Golden Border Glow */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-bat-gold/60 to-bat-yellow/30 opacity-70 group-hover:opacity-100 blur-[8px] transition duration-500 pointer-events-none" />
              
              {/* Corner bat decoration highlights */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-bat-gold z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-bat-gold z-20 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl bg-bat-black-card border border-white/10 z-10">
                <img 
                  src="/developer_profile.jpg" 
                  alt="Dhruv Parashar" 
                  className="w-full h-auto object-cover filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition duration-500 select-none"
                  draggable="false"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Details & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h3 
              className="text-xl md:text-2xl font-semibold text-bat-gold mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              B.Tech CSE (AI & ML) Student & Developer
            </motion.h3>

            <motion.p 
              className="text-white/70 leading-relaxed mb-8 text-sm md:text-base text-justify"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I am a passionate tech enthusiast pursuing my B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence & Machine Learning. I enjoy bridging the gap between design and functionality by crafting seamless frontend systems while integrating intelligent backend AI microservices.
            </motion.p>

            {/* Stats Cards Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="glass-card p-4 flex flex-col items-center justify-center text-center relative group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  {/* Subtle inner card top glow */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-bat-gold/20 to-transparent pointer-events-none" />

                  <span className="text-lg md:text-xl font-bold text-bat-yellow group-hover:text-bat-gold transition-colors duration-300 select-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/50 mt-1 select-none">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
