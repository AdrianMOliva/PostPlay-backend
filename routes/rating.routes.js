const express = require("express");
const router = express.Router();
const Rating = require("./../models/Rating.model");

router.post("/api/ratings", async (req, res) => {
  const { gameId, rating, userId, review } = req.body;
  try {
    if (!gameId || !rating || !userId) {
      return res
        .status(400)
        .json({ message: "Game ID, rating, and user ID are required." });
    }

    const newRating = await Rating.create({ gameId, rating, userId, review });

    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ message: "Failed to save rating." });
  }
});

router.get("/api/ratings/:gameId/average", async (req, res) => {
  const { gameId } = req.params;
  try {
    const ratings = await Rating.find({ gameId });

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this game." });
    }

    const averageRating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).json({ message: "Failed to fetch average rating." });
  }
});

module.exports = router;
