
import {  Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

 export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Main Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              Janak <span className="text-cyan-400">Acharya</span>
            </Link>

            <p className="mt-2 text-sm text-slate-500">
              IT Officer & Full-Stack Developer
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-5 text-sm">
            <HashLink
              smooth
              to="/#home"
              className="hover:text-cyan-400 transition"
            >
              Home
            </HashLink>

            <HashLink
              smooth
              to="/#about"
              className="hover:text-cyan-400 transition"
            >
              About
            </HashLink>

            <HashLink
              smooth
              to="/#skills"
              className="hover:text-cyan-400 transition"
            >
              Skills
            </HashLink>

            <HashLink
              smooth
              to="/#portfolio"
              className="hover:text-cyan-400 transition"
            >
              Portfolio
            </HashLink>

            <Link
              to="/blog"
              className="hover:text-cyan-400 transition"
            >
              Blog
            </Link>

            <HashLink
              smooth
              to="/#contact"
              className="hover:text-cyan-400 transition"
            >
              Contact
            </HashLink>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">

            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 hover:bg-cyan-400 hover:text-slate-950 transition"
            >
              < Mail size={18} />
            </a>

            <a
              href="mailto:your@email.com"
              aria-label="Email"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 hover:bg-cyan-400 hover:text-slate-950 transition"
            >
              <Mail size={18} />
            </a>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm">
          <p>
            © {year} Janak Acharya. All Rights Reserved.
          </p>

          <p className="mt-2 text-slate-600">
            Built with React & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}
