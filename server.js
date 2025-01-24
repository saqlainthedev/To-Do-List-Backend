const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoute = require('./Routes/routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to port 5000
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
if (!MONGO_URI) {
  console.error('MONGO_URI is missing in the .env file.');
  process.exit(1); // Exit the process
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process on failure
  });

// Routes
app.use('/api', taskRoute);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));