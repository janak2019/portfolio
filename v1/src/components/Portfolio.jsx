function Portfolio() {
  const projects = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
  ];

  return (
    <section
      id="portfolio"
      className="min-h-screen bg-slate-950 py-20 px-6"
    >
      <h2 className="text-4xl text-cyan-400 font-bold text-center mb-12">
        Portfolio
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project}
            className="bg-slate-900 p-8 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-white text-xl">{project}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;