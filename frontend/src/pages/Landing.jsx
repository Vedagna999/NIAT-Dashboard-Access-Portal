import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <nav className="navbar">

        <div className="logo">
          🎓 NIAT Portal
        </div>

        <button
          className="admin-nav-btn"
          onClick={() => navigate("/admin")}
        >
          Admin Dashboard
        </button>

      </nav>

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            AI Powered Access Management
          </span>

          <h1>
            NIAT Program
            <br />
            Dashboard
          </h1>

          <p>
            A modern platform to manage dashboard access using
            automated student verification and approval workflows.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/student")}
          >
            Explore Portal
          </button>

        </div>

        <div className="hero-right">

          <div className="glass-card">

            <h2>Choose Your Portal</h2>

            <div
              className="portal-card"
              onClick={() => navigate("/student")}
            >
              <FaUserGraduate className="icon" />

              <div>
                <h3>Student Portal</h3>
                <p>Request dashboard access and login.</p>
              </div>
            </div>

            <div
              className="portal-card"
              onClick={() => navigate("/admin")}
            >
              <FaUserShield className="icon" />

              <div>
                <h3>Admin Dashboard</h3>
                <p>Review student requests and approvals.</p>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Landing;