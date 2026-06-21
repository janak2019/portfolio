import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExperiences } from '../store/slices/portfolioSlice';

const Experience = () => {
  const dispatch = useDispatch();
  const { experiences, loading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Fallback mock experiences in case database is empty
  const mockExperiences = [
    {
      company: 'Enterprise Solutions Corp',
      position: 'Senior Systems Architect',
      duration: 'Jan 2024 - Present',
      startDate: '2024-01-01',
      responsibilities: [
        'Designed high-availability AWS architecture using EKS, ECS, and Serverless configurations.',
        'Orchestrated Infrastructure as Code using Terraform, reducing cloud deployment cycles by 35%.',
        'Implemented strict DevSecOps auditing steps, performing Docker static security testing (SAST).'
      ],
      achievements: [
        'Reduced cloud environment infrastructure overhead by 20% through node caching.',
        'Migrated 12 legacy monolith systems into scalable cloud microservices.'
      ]
    },
    {
      company: 'WebTech Systems Co',
      position: 'Full-Stack Software Engineer',
      duration: 'May 2022 - Dec 2023',
      startDate: '2022-05-01',
      responsibilities: [
        'Built enterprise Express APIs connecting database pipelines (Mongoose / Redis caches).',
        'Coded responsive dashboard views in React Redux, utilizing custom animation effects.',
        'Configured CI/CD automation pipelines via GitHub actions for swift staging releases.'
      ],
      achievements: [
        'Integrated multi-layer JWT authentication systems with automatic session resets.',
        'Improved page rendering loads by 40% through lazy module loading configurations.'
      ]
    }
  ];

  const displayExperiences = experiences.length > 0 ? experiences : mockExperiences;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Professional <span className="gradient-text">Experience</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          An interactive timeline tracing my engineering career, backend systems programming, and DevOps integrations.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-4">
          {/* Vertical line element */}
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-12">
            {displayExperiences.map((exp, idx) => (
              <motion.div
                key={exp._id || exp.position}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-10"
              >
                {/* Timeline Bullet Anchor */}
                <span className="absolute -left-[17px] top-1.5 p-1.5 rounded-full bg-slate-900 border-2 border-brand-cyan text-brand-cyan z-10 flex items-center justify-center ring-4 ring-brand-dark">
                  <Briefcase size={14} />
                </span>

                {/* Card Container */}
                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-brand-purple/30 transition-all duration-300">
                  {/* Top Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">{exp.position}</h3>
                      <h4 className="text-sm font-semibold text-brand-cyan">{exp.company}</h4>
                    </div>
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 bg-slate-800/40 border border-slate-700/60 px-3 py-1.5 rounded-lg w-fit">
                      <Calendar size={12} className="mr-1" />
                      <span>
                        {exp.duration || `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`}
                      </span>
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-3 mb-6">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Responsibilities</h5>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start space-x-2">
                          <span className="text-brand-purple mt-1 shrink-0 font-bold">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Achievements</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="text-xs sm:text-sm text-brand-cyan flex items-start space-x-2">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-brand-cyan" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
