const { registerUserService, loginUserService } = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await registerUserService(name, email, password);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, refreshToken, user } = await loginUserService(email, password);
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            refreshToken,
            user 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const refreshTokenController = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        // Validate and generate new access token
        const newToken = refreshTokenService(refreshToken);
        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshTokenController
};