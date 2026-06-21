import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, MessageSquare, Server, Award, Code } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../store/slices/portfolioSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Typing Effect Logic
  const designations = [
    'Senior Cloud Architect',
    'Full-Stack Software Engineer',
    'DevOps & SecOps Integrator',
    'Technical Solutions Consultant'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const targetWord = designations[currentTextIndex];

    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setCurrentText(targetWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);

      if (currentText === targetWord) {
        setIsDeleting(true);
        setTypingSpeed(1500); // Wait on word
      }
    } else {
      // Deleting
      timer = setTimeout(() => {
        setCurrentText(targetWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);

      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % designations.length);
        setTypingSpeed(500); // Pause before next word
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex]);

  return (
    <div className="relative min-h-[85vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-purple/10 border border-brand-purple/20 text-brand-cyan tracking-wider uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            Hi, I'm <span className="gradient-text">{profile?.name || 'John Doe'}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold text-slate-300 h-10 flex items-center"
          >
            I am a&nbsp;
            <span className="text-brand-cyan typewriter-cursor border-r-2 border-brand-cyan pr-1">
              {currentText}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-400 text-lg max-w-xl leading-relaxed"
          >
            {profile?.aboutSummary ||
              'Designing secure cloud infrastructures, scalable APIs, and responsive frontends. Specializing in Node, React, DevOps automation, and security compliance frameworks.'}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {profile?.resumeUrl ? (
              <a
                href={profile.resumeUrl.startsWith('http') ? profile.resumeUrl : `/api/profile${profile.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-btn flex items-center space-x-2"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            ) : (
              <button
                onClick={() => alert('CV file is not uploaded yet.')}
                className="gradient-btn flex items-center space-x-2"
              >
                <Download size={18} />
                <span>Download CV</span>
              </button>
            )}

            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all flex items-center space-x-2"
            >
              <MessageSquare size={18} />
              <span>Contact Me</span>
            </Link>
          </motion.div>

          {/* Social Anchors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-6 pt-6"
          >
            <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Follow me:</span>
            <div className="flex space-x-4">
              <a
                href={profile?.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-cyan transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={profile?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-cyan transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={profile?.socialLinks?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-cyan transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Graphic Column */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center"
          >
            {/* Pulsing Gradient Backdrops */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-cyan rounded-full filter blur-2xl opacity-20 animate-pulse-slow"></div>
            
            {/* Rotating boundary frame */}
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-700 animate-spin-slow"></div>

            {/* Profile Avatar Outer */}
            <div className="w-[88%] h-[88%] rounded-full p-1.5 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan shadow-xl">
              <div className="w-full h-full rounded-full bg-brand-dark overflow-hidden flex items-center justify-center relative">
                {profile?.imageUrl ? (
                  <img
                    src={profile.imageUrl.startsWith('http') ? profile.imageUrl : `/uploads/${profile.imageUrl}`}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                    <Code size={48} className="text-brand-cyan animate-pulse" />
                    <span className="text-xs uppercase tracking-widest text-slate-400">Dev Environment</span>
                  </div>
                )}
              </div>
            </div>

            {/* Micro floating icons cards */}
            <div className="absolute -top-2 right-4 glass-card p-3 rounded-xl shadow-lg border border-white/10 flex items-center space-x-2 animate-bounce">
              <Server size={16} className="text-brand-cyan" />
              <span className="text-xs font-semibold text-slate-200">AWS / Docker</span>
            </div>

            <div className="absolute bottom-6 -left-4 glass-card p-3 rounded-xl shadow-lg border border-white/10 flex items-center space-x-2 animate-pulse">
              <Award size={16} className="text-brand-cyan" />
              <span className="text-xs font-semibold text-slate-200">Certified Dev</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
