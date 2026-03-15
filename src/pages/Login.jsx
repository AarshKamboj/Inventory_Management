/**
 * UI-only Login Page
 * No backend connection yet
 */

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary navigation to test routing
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Smart Inventory Login</h2>

        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
  },
};

export default Login;