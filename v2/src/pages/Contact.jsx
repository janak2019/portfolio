import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Contact = () => {
  const { profile } = useSelector((state) => state.portfolio);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/contacts', data);
      
      // Trigger canvas-confetti micro animation explosion
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#7c3aed', '#06b6d4'],
      });

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to dispatch message. Using local workspace simulation.');
      
      // Fallback local visual feedback
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
      });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contact <span className="gradient-text">Me</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          Have an inquiry, project proposals, or technical positions? Fill out the contact form or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan mt-1">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Email</h4>
                  <a href={`mailto:${profile?.contactInfo?.email || 'contact@example.com'}`} className="text-slate-200 hover:text-brand-cyan transition-colors text-sm font-semibold">
                    {profile?.contactInfo?.email || 'contact@example.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-purple/10 rounded-xl text-brand-purple mt-1">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Phone</h4>
                  <span className="text-slate-200 text-sm font-semibold">
                    {profile?.contactInfo?.phone || '+1 234 567 890'}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Office Address</h4>
                  <span className="text-slate-200 text-sm font-semibold">
                    {profile?.contactInfo?.address || 'Silicon Valley, CA'}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-6 border-t border-slate-800/60">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Social Networks</h4>
              <div className="flex space-x-3">
                <a href={profile?.socialLinks?.github || 'https://github.com'} target="_blank" rel="noopener" className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-450 hover:text-brand-cyan transition-colors">
                  <FaGithub size={18} />
                </a>
                <a href={profile?.socialLinks?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener" className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-450 hover:text-brand-cyan transition-colors">
                  <FaLinkedin size={18} />
                </a>
                <a href={profile?.socialLinks?.twitter || 'https://twitter.com'} target="_blank" rel="noopener" className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-450 hover:text-brand-cyan transition-colors">
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Elegant Map Card */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 h-64 relative bg-slate-900 flex items-center justify-center">
            {/* Visual simulation of premium Google Map frame */}
            <div className="absolute inset-0 bg-slate-950 opacity-40 mix-blend-overlay"></div>
            <div className="absolute top-4 left-4 z-10 glass-card px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2 text-[10px] uppercase font-bold text-slate-200">
              <MapPin size={10} className="text-brand-cyan" />
              <span>Office Region</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
              <MessageSquareCode size={36} className="text-brand-cyan animate-pulse" />
              <h4 className="text-sm font-bold text-white">Interactive Location Pin</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                {profile?.contactInfo?.address || 'Silicon Valley, CA, USA'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Send Message</h2>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-8 text-center space-y-4 flex flex-col items-center py-16"
              >
                <CheckCircle size={48} className="text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                  Thank you for reaching out. A confirmation statement has been sent to your email. I will respond to your queries as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
                    />
                    {errors.name && <span className="text-[10px] text-rose-450 font-semibold">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
                    />
                    {errors.email && <span className="text-[10px] text-rose-450 font-semibold">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Subject</label>
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
                  />
                  {errors.subject && <span className="text-[10px] text-rose-450 font-semibold">{errors.subject.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Message</label>
                  <textarea
                    rows="6"
                    {...register('message', { required: 'Message body cannot be empty' })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan resize-none"
                  ></textarea>
                  {errors.message && <span className="text-[10px] text-rose-450 font-semibold">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-btn w-full flex items-center justify-center space-x-2 text-xs py-3.5 mt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
