
import profile from "../assets/profile.png";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-slate-900 text-white px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-cyan-400 uppercase tracking-widest text-sm font-semibold">
            Get to know me
          </p>

          <h2 className="mt-2 text-4xl md:text-5xl font-bold">
            About Me
          </h2>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative">

              <div className="absolute -inset-3 border border-cyan-400/30 rounded-2xl rotate-3"></div>

              <img
                src={profile}
                alt="Janak Acharya"
                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl"
              />

            </div>
          </div>

          {/* About Text */}
          <div>

            <h3 className="text-2xl md:text-3xl font-semibold mb-5">
              Building ideas into{" "}
              <span className="text-cyan-400">
                digital experiences
              </span>
            </h3>

            <p className="text-slate-300 leading-8 mb-5">
              I am an IT professional and developer interested in
              building modern, responsive and practical web
              applications. I enjoy turning ideas and real-world
              problems into simple and useful digital solutions.
            </p>

            <p className="text-slate-400 leading-8">
              My current focus is on developing full-stack
              applications using React, JavaScript, Node.js,
              Express and MySQL while continuously improving my
              skills through hands-on projects and learning.
            </p>

            {/* Quick Information */}
            <div className="grid grid-cols-2 gap-5 mt-8">

              <div>
                <p className="text-slate-500 text-sm">
                  Role
                </p>
                <p className="text-slate-200 font-medium mt-1">
                  IT Officer
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Focus
                </p>
                <p className="text-slate-200 font-medium mt-1">
                  Full-Stack Development
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Frontend
                </p>
                <p className="text-slate-200 font-medium mt-1">
                  React & Tailwind CSS
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Backend
                </p>
                <p className="text-slate-200 font-medium mt-1">
                  Node.js & MySQL
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}