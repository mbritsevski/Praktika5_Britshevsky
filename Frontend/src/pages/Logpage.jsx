import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogs } from "../services/api";

export function LogPage() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "Admin") {
      navigate("/");
      return;
    }

    async function fetchLogs() {
      try {
        const res = await getLogs();
        console.log("logs:", res.data);
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs", err);
      }
    }

    fetchLogs();
  }, [navigate, role]);

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return isNaN(date.getTime())
      ? "—"
      : date.toLocaleString("et-EE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")}>Go back</button>
      <h2>List of logs</h2>

      {logs.length === 0 ? (
        <p>Couldn't find any logs</p>
      ) : (
        <ul>
          {logs.map((log) => {
            const user = log.user;
            const action = log.action;
            const timestamp =
              log.timestamp || log.createdAt || log.date || null;
            const formattedDate = formatDate(timestamp);

            return (
              <li key={log.id}>
                <strong>{user}</strong> {action} <em>({formattedDate})</em>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
