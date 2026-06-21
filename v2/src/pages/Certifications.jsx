import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCertifications } from '../store/slices/portfolioSlice';

const Certifications = () => {
  const dispatch = useDispatch();
  const { certifications, loading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchCertifications());
  }, [dispatch]);

  // Fallback mock certificates in case database is empty
  const mockCertifications = [
    {
      title: 'AWS Solutions Architect – Professional',
      issuingOrganization: 'Amazon Web Services (AWS)',
      issueDate: '2025-10-15',
      credentialId: 'AWS-SAP-8902',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      title: 'Certified Kubernetes Administrator (CKA)',
      issuingOrganization: 'The Linux Foundation',
      issueDate: '2025-06-20',
      credentialId: 'CKA-901-289',
      credentialUrl: 'https://training.linuxfoundation.org',
    },
    {
      title: 'CompTIA Security+',
      issuingOrganization: 'CompTIA',
      issueDate: '2024-03-01',
      credentialId: 'COMP-SEC-7718',
      credentialUrl: 'https://comptia.org',
    }
  ];

  const displayCertifications = certifications.length > 0 ? certifications : mockCertifications;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Technical <span className="gradient-text">Certifications</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          A catalogue of validated IT professional credentials, cloud architect badges, and security assessments.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCertifications.map((cert, idx) => (
            <motion.div
              key={cert._id || cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-purple/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Blur gradient decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-purple/5 rounded-full filter blur-lg transition-transform duration-500 group-hover:scale-150"></div>

              <div className="space-y-4">
                {/* Header organization info & badge symbol */}
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-brand-purple/10 rounded-xl text-brand-purple">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl.startsWith('http') ? cert.imageUrl : `/uploads/${cert.imageUrl}`}
                        alt={cert.title}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <Award size={24} className="text-brand-purple" />
                    )}
                  </div>
                  <span className="flex items-center space-x-1 text-[10px] uppercase font-extrabold tracking-widest text-slate-500 bg-slate-800/40 px-2 py-1 rounded border border-slate-700/60">
                    <ShieldCheck size={10} className="text-brand-cyan" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-100 group-hover:text-brand-cyan transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    Issued by: {cert.issuingOrganization}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    {formatDate(cert.issueDate)}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800/40 flex items-center justify-between text-xs">
                {cert.credentialId && (
                  <span className="text-slate-500 font-mono">ID: {cert.credentialId}</span>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-brand-cyan hover:text-white transition-colors font-semibold"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certifications;
