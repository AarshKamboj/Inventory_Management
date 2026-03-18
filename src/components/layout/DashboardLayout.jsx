import { Link } from "react-router-dom";
import { FaChartBar, FaBoxOpen, FaCashRegister } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">BizSaathi</h2>

        <Link to="/" className="nav-item">
          <FaChartBar /> Dashboard
        </Link>

        <Link to="/inventory" className="nav-item">
          <FaBoxOpen /> Inventory
        </Link>

        <Link to="/billing" className="nav-item">
          <FaCashRegister /> Billing
        </Link>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="topbar">
          <input className="search" placeholder="Search..." />
          <div>🔔 Admin</div>
        </div>

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;