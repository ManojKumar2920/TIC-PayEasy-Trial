const User = require("../models/user");

// Get logged-in user details
const getUserProfile = async (req, res) => {
    try {
        // req.user is set by the authMiddleware after token verification
        const user = await User.findById(req.user.id)
            .select('-password') // Exclude password from the result
            .lean(); // Convert to plain JavaScript object

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching user profile", 
            error: error.message 
        });
    }
};

// In userController.js
const updateUserProfile = async (req, res) => {
  try {
      const { name, email } = req.body;
      
      // Validate input
      if (!name && !email) {
          return res.status(400).json({ message: "No update data provided" });
      }

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;

      const user = await User.findByIdAndUpdate(
          req.user.id, 
          updateData, 
          { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
  } catch (error) {
      res.status(500).json({ 
          message: "Error updating user profile", 
          error: error.message 
      });
  }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};