const dotenv = require('dotenv');
dotenv.config();
// jwt.js

const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  console.log("🔐 Verifying Token With Secret:", process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ JWT Error:", err.message);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

const generateToken = (userId) => {
  console.log("🔐 Signing Token With Secret:", process.env.JWT_SECRET);
  return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


module.exports = { jwtAuthMiddleware, generateToken };
