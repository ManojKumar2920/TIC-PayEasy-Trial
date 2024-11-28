const jwt = require("jsonwebtoken");

const generateJWT = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateJWT;
