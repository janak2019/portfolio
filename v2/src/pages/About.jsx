import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, fetchExperiences, fetchEducations } from '../store/slices/portfolioSlice';

const About = () => {
  const dispatch = useDispatch();
  const { profile, experiences, educations } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchExperiences());
    dispatch(fetchEducations());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          About <span className="gradient-text">Me</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          Get to know my professional journey, academic qualifications, and tech credentials.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Bio & Details Column */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full filter blur-xl"></div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <BookOpen className="text-brand-cyan" size={22} />
              <span>Biography</span>
            </h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {profile?.biography ||
                `I am an experienced IT Professional specializing in cloud infrastructures, backend REST API development, security orchestration, and web engineering. Over the years, I have helped design robust cloud platforms, implement secure containerization deployments, and build elegant frontend web portals.

                I enjoy solving complex architectural challenges, automating workflows to increase delivery efficiency, and staying updated with the latest in technology standardizations.`}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-xl flex items-start space-x-3">
              <MapPin className="text-brand-cyan shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Location</h4>
                <p className="text-slate-200 text-sm font-medium">{profile?.contactInfo?.address || 'Silicon Valley, CA'}</p>
              </div>
            </div>
            <div className="glass-card p-5 rounded-xl flex items-start space-x-3">
              <GraduationCap className="text-brand-cyan shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Experience Level</h4>
                <p className="text-slate-200 text-sm font-medium">{experiences.length}+ Completed Roles</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education Timeline Column */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <GraduationCap className="text-brand-purple" size={22} />
              <span>Education</span>
            </h2>

            {educations.length > 0 ? (
              <div className="relative border-l border-slate-800 ml-3 space-y-8">
                {educations.map((edu) => (
                  <div key={edu._id} className="relative pl-6">
                    {/* Circle bullet node */}
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-brand-purple ring-4 ring-brand-dark"></span>
                    
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-brand-cyan flex items-center space-x-1">
                        <Calendar size={12} className="mr-1" />
                        <span>{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</span>
                      </span>
                      <h3 className="text-base font-bold text-slate-100">{edu.degree} in {edu.fieldOfStudy}</h3>
                      <h4 className="text-sm font-medium text-slate-400">{edu.institution}</h4>
                      {edu.description && (
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                No education history listed.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
