import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    revenue: 0,
    sales: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-semibold">Dashboard</h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-xl">
            <p>Revenue</p>
            <h2 className="text-2xl font-bold">₹{data.revenue}</h2>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-xl">
            <p>Sales</p>
            <h2 className="text-2xl font-bold">{data.sales}</h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-5 rounded-xl">
            <p>Low Stock</p>
            <h2 className="text-2xl font-bold">{data.lowStock}</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-5 rounded-xl">
            <p>Out of Stock</p>
            <h2 className="text-2xl font-bold">{data.outOfStock}</h2>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;