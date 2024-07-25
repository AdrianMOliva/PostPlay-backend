require("dotenv").config();

require("./db");

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const { fetchIGDBData } = require("./middleware/igdbApi");
const Game = require("./models/Game.model");
const app = express();
app.use(express.json());

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
