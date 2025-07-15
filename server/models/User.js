const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  aadhar: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // if kept optional
    trim: true
  },
  profileImage: {
    type: String,
    default: 'https://res.cloudinary.com/dz1qj3x8h/image/upload/v1698851234/default-profile-image.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'candidate'],
    default: 'user'
  },
  isVoted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
