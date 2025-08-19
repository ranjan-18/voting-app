import Candidate from "../models/Candidate.js";

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Private
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching candidates", error: err.message });
  }
};

// @desc    Vote for a candidate
// @route   POST /api/candidates/vote/:id
// @access  Private
export const voteCandidate = async (req, res) => {
  try {
    if (req.user.hasVoted) {
      return res.status(400).json({ message: "User has already voted" });
    }

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    candidate.votes += 1;
    await candidate.save();

    req.user.hasVoted = true;
    await req.user.save();

    res.json({ message: "Vote submitted" });
  } catch (err) {
    res.status(500).json({ message: "Error voting", error: err.message });
  }
};

// @desc    Get live results (sorted)
// @route   GET /api/candidates/results
// @access  Private
export const getResults = async (req, res) => {
  try {
    const results = await Candidate.find().sort({ votes: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
};

// @desc    Add new candidate
// @route   POST /api/candidates
// @access  Admin
export const addCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Error adding candidate", error: err.message });
  }
};

// @desc    Update candidate
// @route   PUT /api/candidates/:id
// @access  Admin
export const updateCandidate = async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Candidate not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating candidate", error: err.message });
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Admin
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    await candidate.deleteOne();
    res.json({ message: "Candidate removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting candidate", error: err.message });
  }
};
