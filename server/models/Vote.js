import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
  voter: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  unique: true
},

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
