import { useEffect, useState } from "react";
import api from "../../api/api";

function MessageManagement({onChange}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/messages");

      setMessages(response.data.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/messages/${id}/read`);

      fetchMessages();
      onChange?.();
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/messages/${id}`);

      fetchMessages();
      onChange?.();
    } catch (error) {
      console.error("Failed to delete message:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete message."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading messages...
      </div>
    );
  }

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl">

      <div className="p-6 border-b border-slate-800">
        <h3 className="text-xl font-bold">
          Contact Messages
        </h3>

        <p className="text-sm text-slate-400 mt-1">
          Messages received from your portfolio
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="p-8 text-center text-slate-400">
          No messages yet.
        </div>
      ) : (
        <div className="divide-y divide-slate-800">

          {messages.map((message) => (
            <div
              key={message._id}
              className={`p-6 transition ${
                message.is_read
                  ? "bg-slate-900"
                  : "bg-slate-800/40"
              }`}
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div className="flex-1">

                  <div className="flex items-center gap-3">

                    <h4 className="text-lg font-semibold text-white">
                      {message.name}
                    </h4>

                    {!message.is_read && (
                      <span className="text-xs bg-cyan-400 text-slate-950 px-2 py-1 rounded-full font-semibold">
                        NEW
                      </span>
                    )}

                  </div>

                  <a
                    href={`mailto:${message.email}`}
                    className="text-cyan-400 text-sm hover:underline"
                  >
                    {message.email}
                  </a>

                  <p className="text-slate-300 mt-4 leading-7 whitespace-pre-line">
                    {message.message}
                  </p>

                  <p className="text-xs text-slate-500 mt-4">
                    {new Date(
                      message.created_at
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="flex md:flex-col gap-3 md:min-w-[120px]">

                  {!message.is_read && (
                    <button
                      onClick={() =>
                        markAsRead(message._id)
                      }
                      className="text-cyan-400 hover:underline text-left"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(message._id)
                    }
                    className="text-red-400 hover:underline text-left"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default MessageManagement;