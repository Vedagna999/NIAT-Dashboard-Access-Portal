import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaHome,
  FaRedo,
} from "react-icons/fa";
import "./StudentResult.css";

function StudentResult() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("requestResult");

    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate("/student/request");
    }
  }, [navigate]);

  if (!result) return null;

  const status = result.status;

  let icon;
  let title;
  let color;

  switch (status) {
    case "Approved":
      icon = <FaCheckCircle />;
      title = "Access Approved";
      color = "#22c55e";
      break;

    case "Pending":
      icon = <FaClock />;
      title = "Request Pending";
      color = "#f59e0b";
      break;

    default:
      icon = <FaTimesCircle />;
      title = "Access Rejected";
      color = "#ef4444";
  }

  return (
    <div className="student-result-page">

      <div
        className="result-card"
        style={{
          borderTop: `8px solid ${color}`,
        }}
      >

        <div
          className="result-icon"
          style={{ color }}
        >
          {icon}
        </div>

        <h1>{title}</h1>

        <p className="status-text">
          Status :
          <strong style={{ color }}>
            {" "}
            {status}
          </strong>
        </p>

        <div className="reason-box">
          <h3>Reason</h3>

          <p>
            {result.reason}
          </p>
        </div>

        <div className="timeline">

          <div className="timeline-item">
            ✅ Request Submitted
          </div>

          <div className="timeline-item">
            ✅ Student Verification Completed
          </div>

          <div className="timeline-item">
            {status === "Approved"
              ? "✅ Semester Registration Verified"
              : status === "Pending"
              ? "⏳ Semester Registration Pending"
              : "❌ Verification Failed"}
          </div>

          <div className="timeline-item">
            {status === "Approved"
              ? "🎉 Dashboard Access Granted"
              : status === "Pending"
              ? "⌛ Waiting for Registration"
              : "🚫 Access Denied"}
          </div>

        </div>

        {status === "Approved" ? (
          <button
            className="primary-btn"
            onClick={() =>
              navigate("/student/login")
            }
          >
            <FaHome />
            Go To Login
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={() =>
              navigate("/student/request")
            }
          >
            <FaRedo />
            Try Again
          </button>
        )}

      </div>

    </div>
  );
}

export default StudentResult;