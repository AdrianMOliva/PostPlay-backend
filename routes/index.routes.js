const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Game = require("./../models/Game.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");
const { getTwitchToken, fetchIGDBData } = require("./../middleware/twitchAuth");

router.post("/games", isAuthenticated, async (req, res, next) => {
  try {
    const {
      name,
      genres,
      covers,
      platforms,
      follows,
      summary,
      hypes,
      ratings,
      backlog,
    } = req.body;

    const createdGame = await Game.create({
      name: name,
      genres: genres,
      covers: covers,
      platforms: platforms,
      follows: follows,
      summary: summary,
      hypes: hypes,
      ratings: ratings,
      backlog: backlog,
    });

    res.json(createdGame);
  } catch (error) {
    next(error);
  }
});

router.get("/games", isAuthenticated, async (req, res, next) => {
  try {
    const allGames = await Game.find().populate("covers");
    res.json(allGames);
  } catch (error) {
    next(error);
  }
});

router.get("/games/:gameId", isAuthenticated, async (req, res, next) => {
  try {
    const gameId = req.params.gameId;

    if (mongoose.Types.ObjectId.isValid(gameId) === false) {
      res.status(400).json({ message: "Id is not valid" });
      return;
    }

    const oneGame = await Game.findById(gameId).populate("covers");
    res.json(oneGame);
  } catch (error) {
    next(error);
  }
});

router.put("/games/:gameId", isAuthenticated, async (req, res, next) => {
  try {
    const gameId = req.params.gameId;

    if (mongoose.Types.ObjectId.isValid(gameId) === false) {
      res.status(400).json({ message: "Id is not valid" });
      return;
    }

    const {
      name,
      genres,
      covers,
      platforms,
      follows,
      summary,
      hypes,
      ratings,
      backlog,
    } = req.body;

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      {
        name: name,
        genres: genres,
        covers: covers,
        platforms: platforms,

        follows: follows,
        summary: summary,
        hypes: hypes,
        ratings: ratings,
        backlog: backlog,
      },
      { new: true }
    );

    res.json(updatedGame);
  } catch (error) {
    next(error);
  }
});

router.delete("/games/:gameId", isAuthenticated, async (req, res, next) => {
  try {
    const gameId = req.params.gameId;

    if (mongoose.Types.ObjectId.isValid(gameId) === false) {
      res.status(400).json({ message: "Id is not valid" });
      return;
    }

    const deletedGame = await Game.findByIdAndDelete(gameId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.post("/games/fetch", isAuthenticated, async (req, res, next) => {
  try {
    const accessToken = await getTwitchToken();
    const igdbData = await fetchIGDBData(accessToken);

    const processedData = igdbData.map((item) => ({
      name: item.name,
      genres: item.genres,
      covers: item.covers,
      platforms: item.platforms,
      follows: item.follows,
      summary: item.summary,
      hypes: item.hypes,
      ratings: item.ratings,
      backlog: item.backlog,
    }));

    const savedGames = await Game.insertMany(processedData);
    res.json(savedGames);
  } catch (error) {
    next(error);
  }
});

router.get("/games/check", isAuthenticated, async (req, res, next) => {
  try {
    const allGames = await Game.find();
    res.json(allGames);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
