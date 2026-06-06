import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-black/70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-cyan-400 text-2xl font-bold">
          Janak Acharya
        </h1>

        <nav className="hidden md:flex gap-8 text-white">
          <HashLink smooth to="/#home">Home</HashLink>
          <HashLink smooth to="/#about">About</HashLink>
          <HashLink smooth to="/#skills">Skills</HashLink>
          <HashLink smooth to="/#portfolio">Portfolio</HashLink>

          <Link to="/blog">Blog</Link>

          <HashLink smooth to="/#contact">Contact</HashLink>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 flex flex-col items-center gap-4 py-4">
          <HashLink smooth to="/#home">Home</HashLink>
          <HashLink smooth to="/#about">About</HashLink>
          <HashLink smooth to="/#skills">Skills</HashLink>
          <HashLink smooth to="/#portfolio">Portfolio</HashLink>

          <Link to="/blog">Blog</Link>

          <HashLink smooth to="/#contact">Contact</HashLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;