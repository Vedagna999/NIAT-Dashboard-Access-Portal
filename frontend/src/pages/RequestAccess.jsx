import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserGraduate,
  FaPaperPlane,
} from "react-icons/fa";
import api from "../services/api";
import "./RequestAccess.css";

function RequestAccess() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    full_name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { student_id, full_name, email } = formData;

    if (!student_id || !full_name || !email) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/access/request",
        formData
      );

      // Save result for StudentResult page
      localStorage.setItem(
        "requestResult",
        JSON.stringify(res.data)
      );

      // Student always sees only their own result
      navigate("/student/result");

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
    <div className="request-page">

      <div className="request-left">

        <span className="mini-title">
          NIAT Program Dashboard
        </span>

        <h1>
          Request
          <br />
          Dashboard Access
        </h1>

        <p>
          Submit your details to verify your
          eligibility for the NIAT Program Dashboard.
        </p>

      </div>

      <div className="request-right">

        <div className="request-card">

          <FaUserGraduate className="request-icon" />

          <h2>Access Request</h2>

          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={formData.student_id}
            onChange={handleChange}
          />

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
          >
            <FaPaperPlane />

            {loading
              ? "Submitting..."
              : "Request Access"}
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

export default RequestAccess;