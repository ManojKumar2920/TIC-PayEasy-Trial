const express = require("express");
const { registerUser, loginUser, refreshTokenController } = require("../controllers/authController");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

router.post("/refresh-token", refreshTokenController);

module.exports = router;
