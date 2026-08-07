import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserGraduate } from "react-icons/fa";
import api from "../services/api";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!studentId.trim()) {
      alert("Please enter your Student ID");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/access/student/${studentId}`);

      if (res.data.success) {
        // Store student details for dashboard
        localStorage.setItem(
          "student",
          JSON.stringify(res.data.student)
        );

        navigate("/student/dashboard");
      }

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <span className="mini-title">
          NIAT Student Portal
        </span>

        <h1>
          Welcome
          <br />
          Back 👋
        </h1>

        <p>
          Login using your Student ID to access your
          personalized Program Dashboard.
        </p>

      </div>

      <div className="login-right">

        <div className="login-card">

          <FaUserGraduate className="login-icon" />

          <h2>Student Login</h2>

          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <button
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Continue →"}
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/student")}
          >
            <FaArrowLeft />
            Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentLogin;