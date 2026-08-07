import { useState } from "react";
import {
  FaChartPie,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/admin",
    },
    {
      name: "Approved",
      icon: <FaCheckCircle />,
      path: "/admin/approved",
    },
    {
      name: "Pending",
      icon: <FaClock />,
      path: "/admin/pending",
    },
    {
      name: "Rejected",
      icon: <FaTimesCircle />,
      path: "/admin/rejected",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

      <div className="sidebar-top">

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>

        {!collapsed && (
          <div className="sidebar-logo">
            🎓 NIAT
          </div>
        )}

      </div>

      <div className="menu">

        {menu.map((item) => (
          <div
            key={item.name}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => navigate(item.path)}
          >
            {item.icon}

            {!collapsed && <span>{item.name}</span>}

          </div>
        ))}

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />

        {!collapsed && <span>Logout</span>}
      </button>

    </aside>
  );
}

export default Sidebar;