import { useEffect, useState } from "react";
import api from "../../api/api";

function DashboardStats({ refreshKey })  {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    publishedBlogs: 0,
    messages: 0,
    unreadMessages: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");

      setStats(response.data.data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard stats:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchStats();
}, [refreshKey]);

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
    },
    {
      title: "Blogs",
      value: stats.blogs,
    },
    {
      title: "Published Blogs",
      value: stats.publishedBlogs,
    },
    {
      title: "Messages",
      value: stats.messages,
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
    },
  ];

  if (loading) {
    return (
      <div className="text-slate-400 mb-8">
        Loading statistics...
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h3 className="text-3xl font-bold text-cyan-400 mt-2">
            {card.value}
          </h3>
        </div>
      ))}

    </div>
  );
}

export default DashboardStats;