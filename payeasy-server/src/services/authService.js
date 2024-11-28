const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUserService = async (name, email, password) => {
    try {
        // Validate input data
        if (!name || !email || !password) {
            throw new Error('All fields (name, email, password) are required');
        }

        // Check if the user already exists (email validation)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Check if the name is unique
        const existingName = await User.findOne({ name });
        if (existingName) {
            throw new Error('Name already taken');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });

        // Save the new user
        await newUser.save();

        return newUser;
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

// Login User Service
const loginUserService = async (email, password) => {
    try {
        // Comprehensive input validation
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        // Find user by email with more robust matching
        const user = await User.findOne({ 
            email: email.toLowerCase().trim() 
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate secure JWT token
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: '1h',  // Short-lived token
                algorithm: 'HS256' // Specify algorithm
            }
        );

        // Optional: Implement refresh token mechanism
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        return { 
            token, 
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

module.exports = {
    registerUserService,
    loginUserService
};