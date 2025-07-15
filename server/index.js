const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();


app.get('/', (req, res) => {
  res.send('Server is running');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    connectDB();
});