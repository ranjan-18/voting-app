import Vote from "../models/Vote.js";


// @desc Cast a vote
// @route POST /api/votes


export const castVote = async (req, res) => {
  try {
    const { candidate } = req.body;

    if (!candidate) {
      return res.status(400).json({ message: "Candidate is required" });
    }

    const voter = req.user._id;

    // Check if user already voted
    const alreadyVoted = await Vote.findOne({ voter });
    if (alreadyVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const vote = await Vote.create({ voter, candidate });
    res.status(201).json({ message: "Vote cast successfully", vote });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc Get all votes
// @route GET /api/votes
export const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("candidateId", "name party");
    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


