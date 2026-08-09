import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const navLinks = [
    { label: "Home", to: "/#home", hash: true },
    { label: "About", to: "/#about", hash: true },
    { label: "Skills", to: "/#skills", hash: true },
    { label: "Portfolio", to: "/#portfolio", hash: true },
    { label: "Blog", to: "/blog", hash: false },
    { label: "Contact", to: "/#contact", hash: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
            >
              Janak <span className="text-cyan-400">Acharya</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.hash ? (
                  <HashLink
                    key={link.label}
                    smooth
                    to={link.to}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.label}
                  </HashLink>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-5 py-6 border-t border-white/10">
            {navLinks.map((link) =>
              link.hash ? (
                <HashLink
                  key={link.label}
                  smooth
                  to={link.to}
                  onClick={closeMenu}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.label}
                </HashLink>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMenu}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

