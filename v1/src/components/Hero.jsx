function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-950 to-blue-800 text-center px-4"
    >
      <h1 className="text-5xl md:text-7xl font-bold text-white">
        Hi, I'm <span className="text-cyan-400">Janak Acharya</span>
      </h1>

      <p className="mt-4 text-slate-300 text-xl">
        Frontend Developer | Designer | Learner
      </p>

      <a
        href="#contact"
        className="mt-8 bg-cyan-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
      >
        Hire Me
      </a>
    </section>
  );
}

export default Hero;