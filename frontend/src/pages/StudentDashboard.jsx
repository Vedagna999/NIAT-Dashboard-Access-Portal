import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaEnvelope,
  FaUniversity,
  FaIdCard,
  FaCheckCircle,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("student");

    if (!data) {
      navigate("/student/login");
      return;
    }

    setStudent(JSON.parse(data));
  }, [navigate]);

  if (!student) return null;

  return (
    <div className="student-dashboard">

      <div className="dashboard-header">

        <div>
          <h1>Welcome, {student.full_name} 👋</h1>
          <p>NIAT Program Dashboard</p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("student");
            navigate("/student/login");
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      <div className="student-grid">

        <div className="student-card">
          <FaUserCircle className="card-icon" />
          <h3>Name</h3>
          <p>{student.full_name}</p>
        </div>

        <div className="student-card">
          <FaIdCard className="card-icon" />
          <h3>Student ID</h3>
          <p>{student.student_id}</p>
        </div>

        <div className="student-card">
          <FaEnvelope className="card-icon" />
          <h3>Email</h3>
          <p>{student.email}</p>
        </div>

        <div className="student-card">
          <FaUniversity className="card-icon" />
          <h3>Campus</h3>
          <p>{student.campus || "Hyderabad"}</p>
        </div>

        <div className="student-card">
          <FaCheckCircle className="card-icon success" />
          <h3>Status</h3>
          <p>{student.status}</p>
        </div>

        <div className="student-card">
          <FaCalendarAlt className="card-icon" />
          <h3>Enrollment Date</h3>
          <p>
            {student.program_enrollment_date
              ? new Date(
                  student.program_enrollment_date
                ).toLocaleDateString()
              : "-"}
          </p>
        </div>

      </div>

      <div className="profile-section">

        <button
          className="profile-btn"
          onClick={() => navigate("/student/profile")}
        >
          <FaUserGraduate />
          View Profile
        </button>

      </div>

    </div>
  );
}

export default StudentDashboard;