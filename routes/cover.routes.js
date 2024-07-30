const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Game = require("./../models/Game.model");
const Cover = require("./../models/Cover.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.post("/covers", isAuthenticated, async (req, res, next) => {
  try {
    const { image_id, url, gameId } = req.body;

    if (mongoose.Types.ObjectId.isValid(gameId) === false) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const createdCover = await Cover.create({
      image_id,
      url,
      game: gameId,
    });
    const updatedCover = await Game.findByIdAndUpdate(
      gameId,
      { $push: { covers: createdCover._id } },
      { new: true }
    );

    res.status(201).json(updatedCover);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
