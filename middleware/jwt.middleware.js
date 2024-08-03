const jwt = require("jsonwebtoken");
const { fetchIGDBData, getTwitchToken } = require("./../middleware/twitchAuth");
require("dotenv").config();

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const twitchToken = await getTwitchToken();

    req.payload = payload;
    req.twitchToken = twitchToken;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = { isAuthenticated };
