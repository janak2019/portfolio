const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MySQL",
];

function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen bg-slate-800 py-20 text-center"
    >
      <h2 className="text-4xl font-bold text-cyan-400 mb-10">
        Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-slate-700 px-6 py-4 rounded-lg hover:bg-cyan-400 hover:text-black transition"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;