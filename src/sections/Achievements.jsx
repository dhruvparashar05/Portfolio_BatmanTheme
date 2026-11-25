import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaRobot, FaCalendarAlt } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      title: 'National Hackathons',
      description: 'Competed in multiple national-level hackathons, coding overnight to construct solutions for real-world municipal and corporate trials.',
      icon: FaAward
    },
    {
      title: 'AI Product Builder',
      description: 'Successfully integrated custom large language models, ML algorithms, and conversational bots into production-ready web platforms.',
      icon: FaRobot
    },
    {
      title: 'Technical Organizer',
      description: 'Coordinated, marketed, and managed major bootcamps and workshops, mentoring student developers in web development and cloud technologies.',
      icon: FaCalendarAlt
    }
  ];

  return (
    <section id="achievements" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(247,211,84,0.02)_0%,transparent_70%)] pointer-events-none" />

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
            My <span className="text-bat-gold glow-text-gold">Achievements</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={idx}
                className="glass-card p-6 flex flex-col items-center text-center relative group"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
              >
                {/* Subtle top light bar */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-bat-gold/0 group-hover:via-bat-gold/30 to-transparent transition-all duration-300" />

                {/* Animated Gold/Yellow Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-black/40 border border-white/5 flex items-center justify-center mb-6 group-hover:border-bat-gold/30 group-hover:bg-bat-gold/5 transition-all duration-300">
                  <Icon className="w-6 h-6 text-bat-gold filter drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
                  {ach.title}
                </h3>
                
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  {ach.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
