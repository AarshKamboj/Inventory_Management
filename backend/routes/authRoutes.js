import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔐 GENERATE TOKEN
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    "secret123",
    { expiresIn: "7d" }
  );
};

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ❗ validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ❗ check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ create user (password will auto hash via middleware)
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 IMPORTANT DEBUG
    res.status(500).json({ message: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❗ validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    // ❗ check user + password
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ generate token
    const token = generateToken(user);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err); // 👈 IMPORTANT DEBUG
    res.status(500).json({ message: err.message });
  }
});

export default router;