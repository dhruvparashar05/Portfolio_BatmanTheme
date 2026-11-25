import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaPython, FaJava
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiFramer, SiFirebase, SiVercel, SiCanva, SiGooglecloud, SiGoogle, SiC 
} from 'react-icons/si';

const Skills = () => {
  const categories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Framer Motion', icon: SiFramer, color: '#FM00C0' }
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' }
      ]
    },
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'Java', icon: FaJava, color: '#ED8B00' },
        { name: 'C Language', icon: SiC, color: '#A8B9CC' }
      ]
    },
    {
      title: 'Tools & Ecosystem',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'GitHub', icon: FaGithub, color: '#FFFFFF' },
        { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
        { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
        { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
        { name: 'Gemini API', icon: SiGoogle, color: '#4285F4' },
        { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' }
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(247,211,84,0.02)_0%,transparent_70%)] pointer-events-none" />

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
            My <span className="text-bat-gold glow-text-gold">Skills</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-6 md:p-8 flex flex-col relative overflow-hidden group hover:scale-[1.01]"
              variants={cardVariants}
            >
              {/* Subtle top edge border gold glow on card hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-bat-gold/0 group-hover:via-bat-gold/40 to-transparent transition-all duration-500 pointer-events-none" />

              <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
                {cat.title}
              </h3>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={sIdx}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/5 hover:border-bat-gold/40 hover:bg-bat-gold/5 transition-all duration-300 select-none group/badge"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Icon 
                        className="w-5 h-5 transition-transform duration-300 group-hover/badge:rotate-12"
                        style={{ color: skill.color }} 
                      />
                      <span className="text-sm text-white/80 group-hover/badge:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
