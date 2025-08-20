import express from "express";
import { castVote, getResults } from "../controllers/voteController.js";
import { protect } from "../middlewares/authMiddleware.js"; // your middleware

const router = express.Router();

// Only signed-in users can cast a vote
router.post("/cast", protect, castVote);

// Get all votes (public)
router.get("/result", getResults);

export default router;
