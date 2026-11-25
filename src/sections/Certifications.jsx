import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaDatabase } from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';

const Certifications = () => {
  const certifications = [
    {
      title: 'Oracle AI Foundation Associate',
      issuer: 'Oracle',
      date: '2025',
      description: 'Acquired core proficiency in Artificial Intelligence models, Machine Learning pipelines, and Deep Learning cloud structures.',
      icon: FaDatabase,
      color: '#F80000'
    },
    {
      title: 'Kaggle Community Olympiad 2025',
      issuer: 'Kaggle',
      date: '2025',
      description: 'Recognized for building and optimizing predictive machine learning models under structured data science challenge environments.',
      icon: SiKaggle,
      color: '#20BEFF'
    },
    {
      title: 'Hackathon Participation',
      issuer: 'National Technical Hubs',
      date: '2023 - Present',
      description: 'Recognized for creating functional products under intense sprint conditions at multiple state-level hackathon meetups.',
      icon: FaCertificate,
      color: '#D4AF37'
    }
  ];

  return (
    <section id="certifications" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.015)_0%,transparent_70%)] pointer-events-none" />

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
            Certifications & <span className="text-bat-gold glow-text-gold">Credentials</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={idx}
                className="glass-card p-6 flex flex-col justify-between h-full relative group overflow-hidden"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
              >
                {/* Subtle border accent bar */}
                <div className="absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-bat-gold/0 group-hover:via-bat-gold/40 to-transparent transition-all duration-300" />

                <div>
                  {/* Icon & Issuer info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-bat-gold/20 transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: cert.color }} />
                    </div>
                    <span className="text-xs font-semibold text-bat-yellow uppercase tracking-wider">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-bat-gold transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <h4 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">
                    {cert.issuer}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {cert.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-bat-gold/60 group-hover:text-bat-gold transition-colors duration-300 select-none">
                    Verified Credential
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
