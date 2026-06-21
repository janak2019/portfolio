import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, Terminal } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-navbar fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple text-white">
                <Terminal size={20} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 bg-clip-text">
                Janak<span className="text-brand-cyan">Acharya</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-brand-cyan bg-brand-lightDark/50 shadow-inner'
                    : 'text-slate-300 hover:text-brand-cyan hover:bg-slate-800/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Utility Buttons (Theme, Auth, Mobile Menu) */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800/30 hover:text-brand-cyan transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Dashboard Redirect */}
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-brand-cyan hover:bg-slate-800/30"
              >
                <LayoutDashboard size={18} />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            )}

            {/* Logout Action */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
              >
                <LogOut size={18} />
                <span className="hidden lg:inline">Logout</span>
              </button>
            )}

            {/* Hamburger button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-navbar absolute w-full top-16 left-0 animate-fade-in-down">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-cyan bg-slate-800/60'
                    : 'text-slate-300 hover:text-brand-cyan hover:bg-slate-800/30'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Admin Utilities */}
            {isAuthenticated && (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-brand-cyan"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-400 hover:bg-rose-950/20"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
