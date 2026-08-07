import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle,
  FaIdCard,
  FaEnvelope,
  FaUniversity,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Profile.css";

function Profile() {
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
    <div className="profile-page">

      <div className="profile-card">

        <FaUserCircle className="profile-avatar" />

        <h1>{student.full_name}</h1>

        <p className="profile-subtitle">
          NIAT Program Student
        </p>

        <div className="profile-details">

          <div className="profile-item">
            <FaIdCard />
            <span>Student ID</span>
            <strong>{student.student_id}</strong>
          </div>

          <div className="profile-item">
            <FaEnvelope />
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div className="profile-item">
            <FaUniversity />
            <span>Campus</span>
            <strong>{student.campus || "Hyderabad"}</strong>
          </div>

          <div className="profile-item">
            <FaCheckCircle />
            <span>Status</span>
            <strong>{student.status}</strong>
          </div>

          <div className="profile-item">
            <FaCalendarAlt />
            <span>Enrollment Date</span>
            <strong>
              {student.program_enrollment_date
                ? new Date(
                    student.program_enrollment_date
                  ).toLocaleDateString()
                : "-"}
            </strong>
          </div>

        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/student/dashboard")}
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Profile;