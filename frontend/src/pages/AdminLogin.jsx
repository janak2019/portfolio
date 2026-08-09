import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      if (response.data.success) {
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        localStorage.setItem(
          "admin",
          JSON.stringify(response.data.admin)
        );

        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            Admin Login
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your portfolio
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
        >

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-slate-950 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;