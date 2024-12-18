const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(cors({
    origin:[ 'https://tic-payeasy.vercel.app','http://localhost:5173'], 
    credentials: true
  }));
app.use(express.json());

// Connect to MongoDB
connectDB()

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
