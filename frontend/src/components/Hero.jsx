
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6 pt-20"
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* Small Introduction */}
        <p className="text-cyan-400 font-medium tracking-widest uppercase mb-4">
          Welcome to my portfolio
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
          Hi, I'm{" "}
          <span className="text-cyan-400">
            Janak Acharya
          </span>
        </h1>

        {/* Professional Title */}
        <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-200">
          IT Officer & Full-Stack Developer
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
          I build modern, responsive and user-focused web applications
          using React, JavaScript, Node.js and MySQL.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 hover:scale-105 transition duration-300"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-slate-950 transition duration-300"
          >
            Contact Me
          </a>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="text-slate-500 hover:text-cyan-400 transition"
            aria-label="Scroll to About section"
          >
            <span className="block text-sm mb-2">Scroll to explore</span>
            <span className="text-xl animate-bounce">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}

