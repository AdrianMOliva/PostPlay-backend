const jwt = require("jsonwebtoken");
const { twitchAuthorization } = require("./../middleware/twitchAuth");
require("dotenv").config();

async function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No or invalid token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const twitchToken = await twitchAuthorization();

    req.payload = payload;
    req.twitchToken = twitchToken;

    next();
  } catch (error) {
    let errorMessage = "Invalid token";
    if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    } else if (error.message.includes("Failed to get Twitch")) {
      errorMessage = "Failed to get Twitch token";
    }
    res.status(400).json({ message: errorMessage, error: error.message });
  }
}

module.exports = { isAuthenticated };
