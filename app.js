// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const PORT = 5005;
const app = express();
app.use(express.json());

require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

require("./error-handling")(app);

app.listen(PORT, () => {
  console.log(`Server is running`);
});

module.exports = app;
