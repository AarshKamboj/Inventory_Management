import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaBoxOpen, FaCashRegister } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartBar />,
    },

    // ✅ ONLY ADMIN CAN SEE INVENTORY
    ...(user?.role === "admin"
      ? [
          {
            name: "Inventory",
            path: "/inventory",
            icon: <FaBoxOpen />,
          },
        ]
      : []),

    {
      name: "Billing",
      path: "/billing",
      icon: <FaCashRegister />,
    },
    {
      name: "Invoices",
      path: "/invoices",
      icon: "📄",
    },
  ];

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-blue-600 text-white min-h-screen p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">BizSaathi 🚀</h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition 
            ${
              location.pathname === item.path
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-500"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="p-4 flex justify-between items-center bg-white shadow">
          <input
            placeholder="Search..."
            className="p-2 border rounded-lg w-1/3"
          />

          <div className="flex items-center gap-3">
            <span>🔔 {user?.role?.toUpperCase()}</span>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
