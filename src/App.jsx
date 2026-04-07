import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Invoices from "./pages/Invoices";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* INVENTORY (ADMIN ONLY) */}
      <Route
        path="/inventory"
        element={
          user?.role === "admin" ? (
            <Inventory />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />

      {/* BILLING */}
      <Route
        path="/billing"
        element={user ? <Billing /> : <Navigate to="/" />}
      />

      {/* INVOICES */}
      <Route
        path="/invoices"
        element={user ? <Invoices /> : <Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;