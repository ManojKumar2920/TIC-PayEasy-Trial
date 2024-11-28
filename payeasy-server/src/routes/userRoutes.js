const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Get logged-in user profile
// This route is protected and requires a valid JWT token
router.get("/me", protect, getUserProfile);

router.patch('/me', protect, updateUserProfile);

module.exports = router;