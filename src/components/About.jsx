import profile from "../assets/profile.png";

function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-slate-900 flex flex-wrap justify-center items-center gap-10 px-6"
    >
      <img
        src={profile}
        alt="Profile"
        className="w-64 rounded-full shadow-lg"
      />

      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-cyan-400 mb-4">
          About Me
        </h2>

        <p className="text-slate-300 leading-8">
          I am a passionate React developer who enjoys creating
          modern and responsive web applications.
        </p>
      </div>
    </section>
  );
}

export default About;