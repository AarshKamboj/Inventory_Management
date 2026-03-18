import DashboardLayout from "../components/layout/DashboardLayout";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", sales: 200 },
  { day: "Tue", sales: 400 },
  { day: "Wed", sales: 300 },
  { day: "Thu", sales: 600 },
  { day: "Fri", sales: 800 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>

      <h1>Dashboard</h1>

      {/* CARDS */}
      <div style={cards}>
        <div style={{...card,background:"#3b82f6"}}>₹ 12,000<br/>Revenue</div>
        <div style={{...card,background:"#10b981"}}>120<br/>Sales</div>
        <div style={{...card,background:"#f59e0b"}}>10<br/>Low Stock</div>
        <div style={{...card,background:"#ef4444"}}>2<br/>Out of Stock</div>
      </div>

      {/* CHART */}
      <div style={panel}>
        <h3>Sales Overview</h3>

        <LineChart width={500} height={250} data={data}>
          <CartesianGrid stroke="#ccc"/>
          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey="sales" stroke="#3b82f6"/>
        </LineChart>

      </div>

    </DashboardLayout>
  );
};

const cards = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  fontWeight: "600",
};

const panel = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "12px",
};

export default Dashboard;