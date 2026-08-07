import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DataTable from "../components/DataTable";

import "./AdminDashboard.css";

function RejectedStudents() {
  const headers = [
    "Student ID",
    "Name",
    "Email",
    "Reason",
    "Submitted On",
  ];

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRejectedRequests();
  }, []);

  useEffect(() => {
    const filtered = requests.filter(
      (request) =>
        request.full_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        request.student_id
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredRequests(filtered);
  }, [search, requests]);

  const fetchRejectedRequests = async () => {
    try {
      const res = await api.get("/access/rejected");

      setRequests(res.data);
      setFilteredRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch rejected requests.");
    }
  };

  const tableData = filteredRequests.map((request) => ({
    "Student ID": request.student_id,
    Name: request.full_name,
    Email: request.email,
    Reason: request.reason,
    "Submitted On": request.submitted_on
      ? new Date(request.submitted_on).toLocaleDateString()
      : "-",
  }));

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Topbar />

        <div className="recent-card">
          <div className="recent-header">
            <h2>Rejected Requests</h2>

            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <DataTable
            title=""
            headers={headers}
            data={tableData}
          />
        </div>
      </div>
    </div>
  );
}

export default RejectedStudents;