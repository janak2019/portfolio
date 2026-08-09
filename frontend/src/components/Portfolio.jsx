import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import api from "../api/api";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");

        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="portfolio"
      className="py-24 bg-slate-900 text-white px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-cyan-400 uppercase tracking-widest text-sm font-semibold">
            My Recent Work
          </p>

          <h2 className="mt-2 text-4xl md:text-5xl font-bold">
            Featured Projects
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-400">
            A selection of projects I have worked on using
            modern web technologies.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-slate-400">
            Loading projects...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}

        {/* Projects */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {projects.map((project) => (
              <article
                key={project.id}
                className="group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300"
              >

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-white text-slate-950 hover:bg-cyan-400 transition"
                      >
                        <span className="text-sm font-semibold">
                          GitHub
                        </span>
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white text-slate-950 hover:bg-cyan-400 transition"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}

                  </div>
                </div>

                {/* Content */}
                <div className="p-6">

                  <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-slate-400 text-sm leading-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.technologies
                      ?.split(",")
                      .map((technology) => (
                        <span
                          key={technology}
                          className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300"
                        >
                          {technology.trim()}
                        </span>
                      ))}
                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Portfolio;