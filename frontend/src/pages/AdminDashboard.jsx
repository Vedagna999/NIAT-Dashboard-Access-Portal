import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    const filtered = requests.filter((req) =>
      req.full_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRequests(filtered);
  }, [search, requests]);

  const fetchDashboard = async () => {
    try {
      const statsRes = await api.get("/access/dashboard");
      setStats(statsRes.data);

      const recentRes = await api.get("/access/recent");
      setRequests(recentRes.data);
      setFilteredRequests(recentRes.data);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch dashboard data.");
    }
  };

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar />

        <div className="stats">

          <StatCard
            title="Total Requests"
            value={stats.total}
            color="#4F46E5"
          />

          <StatCard
            title="Approved"
            value={stats.approved}
            color="#22C55E"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            color="#F59E0B"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            color="#EF4444"
          />

        </div>

        <div className="recent-card">

          <div className="recent-header">

            <h2>Recent Requests</h2>

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <table>

            <thead>

              <tr>

                <th>Student</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {filteredRequests.length === 0 ? (

                <tr>

                  <td colSpan="4">
                    No Requests Found
                  </td>

                </tr>

              ) : (

                filteredRequests.map((req) => (

                  <tr key={req.request_id}>

                    <td>{req.full_name}</td>

                    <td>{req.email}</td>

                    <td
                      className={
                        req.request_status.toLowerCase()
                      }
                    >
                      {req.request_status}
                    </td>

                    <td>
                      {new Date(
                        req.submitted_on
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;