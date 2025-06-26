const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Mongoose model
const JWT_SECRET = process.env.JWT_SECRET || "mysecret"; // Keep this in .env

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// --- LOGIN ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "9h",
  });

  console.log("Logged in")

  res.json({ token });
});

// --- VERIFY ADMIN PASSWORD ---
router.post("/verify-admin", (req, res) => {
  const { adminPassword } = req.body;
  if (adminPassword === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Verified" });
  }
  return res.status(403).json({ message: "Incorrect admin password" });
});

// --- CREATE NEW USER ---
router.post("/create-user", async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashed });
  await newUser.save();
  res.status(201).json({ message: "User created" });
});

// --- GET PROFILE ---
router.get("/profile", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("username email"); // fetch real data
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});


module.exports = router;
