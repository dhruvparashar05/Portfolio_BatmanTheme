import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const socials = [
    { name: 'Email', icon: FaEnvelope, url: 'mailto:dhruvparashar0505@gmail.com', display: 'dhruvparashar0505@gmail.com', color: '#D4AF37' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/dhruv-parashar-0a249030a/', display: 'dhruv-parashar-0a249030a', color: '#0A66C2' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/dhruvparashar05', display: 'dhruvparashar05', color: '#FFFFFF' },
    { name: 'X (Twitter)', icon: FaXTwitter, url: 'https://x.com/dhruvvparashar', display: 'dhruvvparashar', color: '#FFFFFF' }
  ];

  return (
    <section id="contact" className="relative py-24 px-4 bg-bat-black-bg overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.02)_0%,transparent_70%)] pointer-events-none" />

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
            Contact <span className="text-bat-gold glow-text-gold">Me</span>
          </motion.h2>
          <div className="h-[2px] w-16 bg-bat-gold mx-auto mt-4" />
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Social Connections Info */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between glass-card p-6 md:p-8"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-4">
                Get In Touch
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Have an exciting project to discuss, a community event to organize, or simply want to say hello? Drop a message. I am always open to discussing new opportunities, integrations, and hackathon projects.
              </p>
            </div>

            {/* Social Grid List */}
            <div className="flex flex-col gap-4">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-bat-gold/40 hover:bg-bat-gold/5 transition-all duration-300 group"
                    whileHover={{ x: 6 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-bat-gold/30 group-hover:bg-bat-gold/10 transition-colors duration-300">
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" style={{ color: social.color }} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors duration-300">
                        {social.name}
                      </h4>
                      <p className="text-sm font-medium text-white/80 group-hover:text-bat-gold transition-colors duration-300">
                        {social.name === 'Email' ? social.display : `@${social.display}`}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="lg:col-span-7 glass-card p-6 md:p-8 relative"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {submitted ? (
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-bat-black-card/90 rounded-2xl z-20 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-bat-gold/10 border border-bat-gold/40 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-bat-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-2">
                  Message Transmitted
                </h3>
                <p className="text-white/60 text-sm max-w-sm">
                  Thank you, Dhruv has received your coordinates and will establish communication shortly.
                </p>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full justify-between">
              <div className="space-y-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-bat-gold/60 focus:bg-black/60 transition-all duration-300 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-bat-gold/60 focus:bg-black/60 transition-all duration-300 text-sm"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your message..."
                    className="px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-bat-gold/60 focus:bg-black/60 transition-all duration-300 text-sm resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3.5 rounded-lg bg-gradient-to-r from-bat-gold to-bat-yellow hover:scale-[1.01] text-black font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-yellow-glow"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
