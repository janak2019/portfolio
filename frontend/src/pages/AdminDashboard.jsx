import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProjectManagement from "../components/admin/ProjectManagement";
import BlogManagement from "../components/admin/BlogManagement";
import MessageManagement from "../components/admin/MessageManagement";
import DashboardStats from "../components/admin/DashboardStats";

function AdminDashboard() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const token = localStorage.getItem("adminToken");

  const refreshDashboard = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin");
  };

  // Handle sidebar navigation
  const handleNavigation = (selectedPage) => {
    setPage(selectedPage);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= MOBILE HEADER ================= */}
      <header className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5">

        <h1 className="text-xl font-bold text-cyan-400">
          Admin Panel
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-white"
        >
          {open ? <X /> : <Menu />}
        </button>

      </header>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          w-64 h-screen
          bg-slate-900
          border-r border-slate-800
          flex flex-col
          transform transition-transform duration-300
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold text-cyan-400">
            Janak Admin
          </h1>

        </div>

        {/* Admin Info */}
        <div className="px-6 py-6 border-b border-slate-800">

          <p className="text-white font-semibold">
            {admin.name || "Admin"}
          </p>

          <p className="text-sm text-slate-400 truncate">
            {admin.email || ""}
          </p>

        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 p-4 space-y-2">

          {/* Dashboard */}
          <button
            onClick={() => handleNavigation("dashboard")}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition
              ${
                page === "dashboard"
                  ? "bg-cyan-400 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }
            `}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          {/* Projects */}
          <button
            onClick={() => handleNavigation("projects")}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition
              ${
                page === "projects"
                  ? "bg-cyan-400 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }
            `}
          >
            <FolderKanban size={20} />
            Projects
          </button>

          {/* Blog */}
          <button
            onClick={() => handleNavigation("blog")}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition
              ${
                page === "blog"
                  ? "bg-cyan-400 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }
            `}
          >
            <FileText size={20} />
            Blog
          </button>

          {/* Messages */}
          <button
            onClick={() => handleNavigation("messages")}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition
              ${
                page === "messages"
                  ? "bg-cyan-400 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }
            `}
          >
            <MessageSquare size={20} />
            Messages
          </button>

        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="p-4 border-t border-slate-800">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="md:ml-64 p-6 md:p-10">

        {/* ================= DASHBOARD ================= */}
        {page === "dashboard" && (
          <>
            <div className="mb-10">

              <h2 className="text-3xl md:text-4xl font-bold">
                Dashboard
              </h2>

              <p className="text-slate-400 mt-2">
                Welcome back, {admin.name || "Admin"}.
              </p>

            </div>

            <DashboardStats
              refreshKey={refreshKey}
            />
          </>
        )}

        {/* ================= PROJECTS ================= */}
        {page === "projects" && (
          <>
            <div className="mb-8">

              <h2 className="text-3xl md:text-4xl font-bold">
                Project Management
              </h2>

              <p className="text-slate-400 mt-2">
                Manage your portfolio projects.
              </p>

            </div>

            <ProjectManagement
              onChange={refreshDashboard}
            />
          </>
        )}

        {/* ================= BLOG ================= */}
        {page === "blog" && (
          <>
            <div className="mb-8">

              <h2 className="text-3xl md:text-4xl font-bold">
                Blog Management
              </h2>

              <p className="text-slate-400 mt-2">
                Create, edit and manage blog posts.
              </p>

            </div>

            <BlogManagement
              onChange={refreshDashboard}
            />
          </>
        )}

        {/* ================= MESSAGES ================= */}
        {page === "messages" && (
          <>
            <div className="mb-8">

              <h2 className="text-3xl md:text-4xl font-bold">
                Message Management
              </h2>

              <p className="text-slate-400 mt-2">
                View and manage messages from visitors.
              </p>

            </div>

            <MessageManagement
              onChange={refreshDashboard}
            />
          </>
        )}

      </main>

    </div>
  );
}

export default AdminDashboard;

