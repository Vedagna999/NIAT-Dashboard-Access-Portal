import { FaUserShield } from "react-icons/fa";
import "./Topbar.css";

function Topbar() {
  return (
    <div className="topbar">

      <div className="topbar-left">
        <h2>Welcome Back 👋</h2>
        <p>
          Manage student requests and dashboard access.
        </p>
      </div>

      <div className="profile">

        <div className="admin-profile-icon">
  <FaUserShield />
</div>

<div>
  <strong>Administrator</strong>
  <p>NIAT Portal</p>
</div>

      </div>

    </div>
  );
}

export default Topbar;