import { useState } from "react";
import api from "../api/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post("/messages", formData);

      setSuccess(
        response.data.message || "Message sent successfully!"
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-cyan-400 text-center mb-10">
          Contact Me
        </h2>

        {success && (
          <div className="max-w-xl mx-auto mb-5 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
            {success}
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-4 rounded-lg bg-slate-900 text-white border border-slate-800 focus:border-cyan-400 outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="p-4 rounded-lg bg-slate-900 text-white border border-slate-800 focus:border-cyan-400 outline-none"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
            className="p-4 rounded-lg bg-slate-900 text-white border border-slate-800 focus:border-cyan-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </section>
  );
}

export default Contact;