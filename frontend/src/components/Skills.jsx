
import {
  Code2,
  Palette,
  Server,
  Database,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    icon: <Code2 size={28} />,
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Backend",
    icon: <Server size={28} />,
    skills: ["Node.js"],
  },
  {
    title: "Database",
    icon: <Database size={28} />,
    skills: ["MySQL"],
  },
  {
    title: "Web Design",
    icon: <Palette size={28} />,
    skills: ["Responsive Design", "UI Design"],
  },
];

 export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-slate-950 text-white px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-cyan-400 uppercase tracking-widest text-sm font-semibold">
            What I work with
          </p>

          <h2 className="mt-2 text-4xl md:text-5xl font-bold">
            Skills & Technologies
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-400">
            Technologies and skills I use to build modern,
            responsive and practical web applications.
          </p>
        </div>

        {/* Skill Groups */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300"
            >

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition duration-300">
                {group.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-semibold">
                {group.title}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-full bg-slate-800 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
