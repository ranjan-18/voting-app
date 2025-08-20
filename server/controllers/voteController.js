import User from "../models/User.js";
import Candidate from "../models/Candidate.js";
import Vote from "../models/Vote.js";

// Vote controller - only for authenticated users
export const castVote = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { candidateId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.hasVoted) return res.status(400).json({ message: "You have already voted" });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // Save vote
    const vote = new Vote({ voter: userId, candidate: candidateId });
    await vote.save();

    // Increment candidate votes
    candidate.votes += 1;
    await candidate.save();

    // Mark user as voted
    user.hasVoted = true;
    await user.save();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get results - accessible by anyone
export const getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .select("name party votes -_id")
      .sort({ votes: -1 });
    res.status(200).json({ candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
