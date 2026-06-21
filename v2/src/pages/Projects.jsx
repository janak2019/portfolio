import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../store/slices/portfolioSlice';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.portfolio);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const categories = [
    'All',
    'Programming Languages',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Cyber Security',
    'DevOps',
    'AI & Machine Learning'
  ];

  // Client-side filtering logic
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  // Fallback mock projects in case DB is blank
  const mockProjects = [
    {
      title: 'Enterprise Kubernetes Clusters Deployment',
      description: 'Fully automated provisioning of high-availability AWS EKS clusters utilizing Terraform infrastructure code, Helm package management, and ArgoCD gitops syncing pipelines.',
      category: 'DevOps',
      technologies: ['Terraform', 'Kubernetes', 'EKS', 'ArgoCD', 'Helm'],
      imageUrl: '',
      githubUrl: 'https://github.com',
      liveUrl: 'https://aws.amazon.com',
    },
    {
      title: 'DevSecOps Auditing Automation Tool',
      description: 'A cybersecurity script suite that executes automated Docker vulnerability audits, static application scans (SAST), and configuration compliance audits across cloud environments.',
      category: 'Cyber Security',
      technologies: ['Python', 'Trivy', 'SonarQube', 'Docker', 'Bash'],
      imageUrl: '',
      githubUrl: 'https://github.com',
      liveUrl: '',
    },
    {
      title: 'Microservices Gateway API',
      description: 'High performance web API orchestrator designed to route backend request queues, integrate JSON authentication mechanisms, and cache database transactions.',
      category: 'Web Development',
      technologies: ['Node.js', 'Express', 'JWT', 'Redis', 'MongoDB'],
      imageUrl: '',
      githubUrl: 'https://github.com',
      liveUrl: 'https://google.com',
    }
  ];

  const displayProjects = projects.length > 0 ? filteredProjects : (
    activeCategory === 'All' ? mockProjects : mockProjects.filter(p => p.category === activeCategory)
  );

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          My <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          Explore a selection of backend architectures, automated cloud operations, and responsive web projects.
        </p>
      </div>

      {/* Categories Navigation Filter Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 border-b border-slate-800/80 pb-4 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-md'
                : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project, idx) => (
              <motion.div
                layout
                key={project._id || project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group relative border border-white/5"
              >
                {/* Card Top Image / Icon Placeholder */}
                <div className="h-48 w-full bg-slate-900 flex items-center justify-center overflow-hidden relative border-b border-slate-800/60">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl.startsWith('http') ? project.imageUrl : `/uploads/${project.imageUrl}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-600 space-y-2">
                      <Code2 size={40} className="text-slate-500 opacity-60 group-hover:animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">Project Workspace</span>
                    </div>
                  )}
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] uppercase tracking-wider bg-brand-dark/80 text-brand-cyan border border-white/10 rounded-full font-bold">
                    {project.category}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-grow flex flex-col space-y-4">
                  <h3 className="font-bold text-lg text-white group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] bg-slate-850 text-slate-300 rounded border border-slate-800 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions Footer Links */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/40 text-sm">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-cyan transition-colors"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 text-slate-400 hover:text-brand-cyan transition-colors ml-auto"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && displayProjects.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-sm">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default Projects;
