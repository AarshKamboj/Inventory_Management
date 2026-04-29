import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  // 🔐 HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await axios.post(url, form);

      // LOGIN
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/dashboard";
      } else {
        alert("Signup successful! Now login.");
        setIsLogin(true);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login to BizSaathi 🚀" : "Create Account"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-xl"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {!isLogin && (
            <select
              className="w-full p-3 border rounded-xl"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* GOOGLE LOGIN */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                // 🔗 SEND TOKEN TO BACKEND
                const res = await axios.post(
                  "http://localhost:5000/api/auth/google",
                  {
                    token: credentialResponse.credential,
                  }
                );

                // ✅ SAVE USER
                localStorage.setItem("user", JSON.stringify(res.data));

                // ✅ REDIRECT
                window.location.href = "/dashboard";

              } catch (err) {
                console.log("Google login failed", err);
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        {/* TOGGLE */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue-600 cursor-pointer ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;