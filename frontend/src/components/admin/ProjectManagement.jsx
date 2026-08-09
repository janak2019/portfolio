
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import AddProjectForm from "./AddProjectForm";
import EditProjectForm from "./EditProjectForm";

function ProjectManagement({ onChange }) {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      setProjects(response.data.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };
const fetchProjects = async () => {
  try {
    const response = await api.get("/projects");

    console.log("PROJECT API RESPONSE:", response.data);

    setProjects(response.data.data);
  } catch (error) {
    console.error("PROJECT FETCH ERROR:", error);
  }
};
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/projects/${id}`);

      fetchProjects();
      onChange?.();
    } catch (error) {
      console.error("Failed to delete project:", error);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to delete project."
        );
      }
    }
  };

  return (
    <>
      {/* Add Project Form */}
      {showAddForm && (
        <AddProjectForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            fetchProjects();
            onChange?.();
          }}
        />
      )}

      {/* Edit Project Form */}
      {editingProject && (
        <div className="mb-6">
          <EditProjectForm
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSuccess={() => {
              setEditingProject(null);
              fetchProjects();
              onChange?.();
            }}
          />
        </div>
      )}

      {/* Projects */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl">

        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">
              Recent Projects
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Projects stored in MongoDB
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Add Project
          </button>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="text-slate-400 text-sm border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">
                  #
                </th>

                <th className="px-6 py-4">
                  Project
                </th>

                <th className="px-6 py-4">
                  Technologies
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {projects.map((project, index) => (
                <tr
                  key={project._id}
                  className="border-b border-slate-800 last:border-none"
                >

                  <td className="px-6 py-4 text-slate-400">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold">
                      {project.title}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      {project.description}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {project.technologies}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          setEditingProject(project)
                        }
                        className="text-cyan-400 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(project._id)
                        }
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>
    </>
  );
}

export default ProjectManagement;
