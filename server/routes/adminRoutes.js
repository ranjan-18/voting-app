import express from "express";
import {
  getCandidates,
  voteCandidate,
  getResults,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidateController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public-facing (protected by auth)
router.get("/", protect, getCandidates);
router.post("/vote/:id", protect, voteCandidate);
router.get("/results", protect, getResults);

// Admin routes
router.post("/", protect, adminOnly, addCandidate);
router.put("/:id", protect, adminOnly, updateCandidate);
router.delete("/:id", protect, adminOnly, deleteCandidate);

export default router;
