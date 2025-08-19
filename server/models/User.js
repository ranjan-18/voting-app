import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  aadharNumber: { type: String, required: true, unique: true }, // unique Govt ID
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  hasVoted: { type: Boolean, default: false }
});

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
