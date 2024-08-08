require("dotenv").config();

require("./db");

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const {
  twitchAuthorization,
  getTwitchToken,
} = require("./middleware/twitchAuth");
const Game = require("./models/Game.model");
const app = express();
app.use(express.json());

require("./config")(app);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const coverRoutes = require("./routes/cover.routes");
app.use("/api", coverRoutes);

const ratingRoutes = require("./routes/rating.routes");
app.use("/api", ratingRoutes);

require("./error-handling")(app);

module.exports = app;
