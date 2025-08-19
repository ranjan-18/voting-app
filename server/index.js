import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // ✅ make sure extension .js
import userRoutes from "./routes/userRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js";

import voteRoutes from "./routes/voteRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true })); // allow frontend requests
app.use(express.json()); // parse JSON body

// Connect MongoDB
connectDB();

// API Routes
app.use("/api/users", userRoutes);         // login, register, Aadhaar auth
       // admin panel: approve, results
app.use("/api/admin", adminRoutes); // CRUD candidates
app.use("/api/votes", voteRoutes);         // vote, results

// Default Route
app.get("/", (req, res) => {
  res.send("🗳️ Voting App API is running...");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
