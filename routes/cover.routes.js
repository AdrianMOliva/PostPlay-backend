const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Game = require("./../models/Game.model");
const Cover = require("./../models/Cover.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");
const { getTwitchToken, fetchCovers } = require("./../middleware/twitchAuth");

router.post("/covers", isAuthenticated, async (req, res, next) => {
  try {
    const accessToken = await getTwitchToken();
    const igdbData = await fetchCovers(accessToken);

    const processedData = igdbData.map((item) => ({
      url: item.url,
      image_id: item.image_id,
      game: item.game,
    }));

    const savedCovers = await Cover.insertMany(processedData);
    res.json(savedCovers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
