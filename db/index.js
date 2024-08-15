const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/POSTPLAY";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo, Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to database", err));
