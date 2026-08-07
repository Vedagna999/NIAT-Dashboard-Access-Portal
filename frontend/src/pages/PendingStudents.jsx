import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DataTable from "../components/DataTable";

import "./AdminDashboard.css";

function PendingStudents() {
  const headers = [
    "Student ID",
    "Name",
    "Email",
    "Campus",
    "Enrollment Date",
    "Status",
  ];

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.full_name.toLowerCase().includes(search.toLowerCase()) ||
        student.student_id.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [search, students]);

  const fetchPendingStudents = async () => {
    try {
      const res = await api.get("/access/pending");

      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch pending students.");
    }
  };

  const tableData = filteredStudents.map((student) => ({
    "Student ID": student.student_id,
    Name: student.full_name,
    Email: student.email,
    Campus: student.campus || "Hyderabad",
    "Enrollment Date": student.program_enrollment_date
      ? new Date(student.program_enrollment_date).toLocaleDateString()
      : "-",
    Status: student.status,
  }));

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Topbar />

        <div className="recent-card">
          <div className="recent-header">
            <h2>Pending Students</h2>

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

export default PendingStudents;