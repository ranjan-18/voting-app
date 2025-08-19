import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc   Signup new user
// @route  POST /api/users/signup
// @access Public
export const signupUser = async (req, res) => {
  try {
    const { aadharNumber, password, role } = req.body; // ✅ also accept role

    // check if user exists
    const exists = await User.findOne({ aadharNumber });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user (role will be "user" by default if not provided)
    const user = await User.create({ 
      aadharNumber, 
      password, 
      role: role === "admin" ? "admin" : "user" // ✅ only allow user/admin
    });

    res.status(201).json({
      _id: user._id,
      aadharNumber: user.aadharNumber,
      role: user.role, // ✅ include role in response
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// @desc   Login user
// @route  POST /api/users/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { aadharNumber, password } = req.body;
    const user = await User.findOne({ aadharNumber });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        aadharNumber: user.aadharNumber,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};





