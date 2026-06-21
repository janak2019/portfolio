import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Database, Cloud, Shield, Network, Settings, Brain, Globe } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSkills } from '../store/slices/portfolioSlice';

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const skillCategories = [
    { name: 'Programming Languages', icon: <Code size={20} /> },
    { name: 'Web Development', icon: <Globe size={20} /> },
    { name: 'Mobile Development', icon: <Cpu size={20} /> },
    { name: 'Database', icon: <Database size={20} /> },
    { name: 'Cloud Computing', icon: <Cloud size={20} /> },
    { name: 'Cyber Security', icon: <Shield size={20} /> },
    { name: 'Networking', icon: <Network size={20} /> },
    { name: 'DevOps', icon: <Settings size={20} /> },
    { name: 'AI & Machine Learning', icon: <Brain size={20} /> },
  ];

  // Helper to filter skills by category
  const getSkillsByCategory = (categoryName) => {
    return skills.filter((skill) => skill.category === categoryName);
  };

  // Default fallback mock data to wow user in case DB is blank
  const mockSkills = {
    'Programming Languages': [
      { name: 'JavaScript / TypeScript', proficiency: 90 },
      { name: 'Python', proficiency: 85 },
      { name: 'Go', proficiency: 75 },
    ],
    'Web Development': [
      { name: 'React.js & Next.js', proficiency: 92 },
      { name: 'Node.js & Express', proficiency: 88 },
      { name: 'CSS / Tailwind CSS', proficiency: 90 },
    ],
    'DevOps': [
      { name: 'Docker & Kubernetes', proficiency: 80 },
      { name: 'CI/CD Pipelines (GitHub Actions)', proficiency: 82 },
      { name: 'Linux administration', proficiency: 85 },
    ],
    'Cloud Computing': [
      { name: 'Amazon Web Services (AWS)', proficiency: 85 },
      { name: 'Google Cloud Platform (GCP)', proficiency: 70 },
    ]
  };

  return (
    <div className="space-y-12">
      {/* Page header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Technical <span className="gradient-text">Skills</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          A detailed breakdown of my engineering capabilities, programming expertise, and operations certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const catSkills = getSkillsByCategory(cat.name);
          const displaySkills = catSkills.length > 0 ? catSkills : (mockSkills[cat.name] || []);

          if (displaySkills.length === 0) return null;

          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-3 text-brand-cyan mb-2">
                <div className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg text-white">{cat.name}</h3>
              </div>

              <div className="space-y-4 flex-grow">
                {displaySkills.map((skill, sIdx) => (
                  <div key={skill.name || sIdx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-brand-cyan">{skill.proficiency}%</span>
                    </div>
                    {/* Skill progress bar wrapper */}
                    <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.05 + sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
