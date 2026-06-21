import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Lock, Mail, Terminal, AlertCircle } from 'lucide-react';
import { loginUser, clearAuthError } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Clear previous authorization errors on mount
    dispatch(clearAuthError());
    
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-purple/10 rounded-full filter blur-2xl"></div>

        {/* Branding header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg mx-auto">
            <Terminal size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Administrative Portal</h2>
          <p className="text-xs text-slate-400">
            Sign in to manage portfolio content, review analytics, and check messages.
          </p>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="p-3.5 bg-rose-950/20 border border-rose-500/30 rounded-lg flex items-center space-x-2 text-xs text-rose-350 animate-pulse">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                type="email"
                required
                placeholder="admin@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
            </div>
            {errors.email && <span className="text-[10px] text-rose-450 font-semibold">{errors.email.message}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                type="password"
                required
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
            </div>
            {errors.password && <span className="text-[10px] text-rose-450 font-semibold">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gradient-btn w-full flex items-center justify-center space-x-2 text-xs py-3 mt-4"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-[10px] text-slate-500">
          <p>Local sandbox: use configured email/password details</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
