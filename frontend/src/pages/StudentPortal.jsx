import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaClipboardCheck } from "react-icons/fa";
import "./StudentPortal.css";

function StudentPortal() {
  const navigate = useNavigate();

  return (
    <div className="student-portal">

      <div className="portal-header">

        <h1>🎓 Student Portal</h1>

        <p>
          Access your NIAT dashboard or request access if you're a first-time user.
        </p>

      </div>

      <div className="portal-grid">

        <div
          className="action-card"
          onClick={() => navigate("/student/login")}
        >

          <FaSignInAlt className="action-icon" />

          <h2>Student Login</h2>

          <p>
            Login using your Student ID and continue to your dashboard.
          </p>

          <button>Continue →</button>

        </div>

        <div
          className="action-card"
          onClick={() => navigate("/student/request")}
        >

          <FaClipboardCheck className="action-icon" />

          <h2>Request Dashboard Access</h2>

          <p>
            New students can request dashboard access by submitting their details.
          </p>

          <button>Request Access →</button>

        </div>

      </div>

    </div>
  );
}

export default StudentPortal;