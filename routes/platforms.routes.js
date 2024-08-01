const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Game = require("./../models/Game.model");
const Cover = require("./../models/Cover.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post("/platforms", isAuthenticated, async (req, res, next) => {
  try {
    const { image_id, url, gameId } = req.body;

    if (mongoose.Types.ObjectId.isValid(gameId) === false) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const createdPlatform = await Platform.create({
      image_id,
      url,
      game: gameId,
    });
    const updatedPlatform = await Game.findByIdAndUpdate(
      gameId,
      { $push: { platforms: createdPlatform._id } },
      { new: true }
    );

    res.status(201).json(updatedPlatform);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
