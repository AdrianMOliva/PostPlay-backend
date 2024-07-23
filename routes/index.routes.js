const express = require("express");
const router = express.Router();

const Game = require("./../models/Game.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post("https://api.igdb.com/v4/games");
