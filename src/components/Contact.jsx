function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-blue-950 py-20 px-6"
    >
      <h2 className="text-4xl text-cyan-400 text-center font-bold mb-10">
        Contact Me
      </h2>

      <form className="max-w-xl mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-4 rounded-lg bg-slate-900 text-white"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="p-4 rounded-lg bg-slate-900 text-white"
        />

        <textarea
          rows="5"
          placeholder="Your Message"
          className="p-4 rounded-lg bg-slate-900 text-white"
        />

        <button className="bg-cyan-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;