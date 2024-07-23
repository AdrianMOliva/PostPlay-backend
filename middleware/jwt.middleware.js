const jwt = require("jsonwebtoken");
const { twitchAuthorization } = require("./../middleware/twitchAuth");
require("dotenv").config();

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const twitchToken = await twitchAuthorization();

    req.payload = payload;
    req.twitchToken = twitchToken;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = { isAuthenticated };
