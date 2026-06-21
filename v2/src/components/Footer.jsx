import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark/90 border-t border-slate-800/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple text-white">
                <Terminal size={18} />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                janak<span className="text-brand-cyan">acharya</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              Enterprise-grade IT Professional Portfolio Website. Showcasing software architecture designs, project deployments, technical insights, and cloud infrastructure blogs.
            </p>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-brand-cyan transition-colors">About Me</Link>
              </li>
              <li>
                <Link to="/skills" className="text-slate-400 hover:text-brand-cyan transition-colors">My Skills</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-brand-cyan transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-brand-cyan transition-colors">Insights Blog</Link>
              </li>
            </ul>
          </div>

          {/* Social Links Col */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-brand-cyan hover:bg-slate-800 transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-brand-cyan hover:bg-slate-800 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-brand-cyan hover:bg-slate-800 transition-all"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-brand-cyan hover:bg-slate-800 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <div className="mt-4">
              <Link to="/admin/login" className="text-xs text-slate-500 hover:text-brand-cyan transition-colors">
                Administrative Login
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/40 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {currentYear} Janak Acharya. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with React, Tailwind CSS, & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
