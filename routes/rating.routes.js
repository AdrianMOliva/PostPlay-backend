const express = require("express");
const router = express.Router();
const Rating = require("./../models/Rating.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const mongoose = require("mongoose");

router.post("/ratings", async (req, res) => {
  const { gameId, rating, review, userId } = req.body;

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

router.get("/ratings/:gameId/average", async (req, res) => {
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

router.delete("/ratings/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  try {
    const result = await Rating.findByIdAndDelete(reviewId);

    if (!result) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review." });
  }
});

router.get("/ratings/:gameId/reviews", isAuthenticated, async (req, res) => {
  const { gameId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    const reviews = await Rating.find({ gameId }).populate(
      "userId",
      "userName"
    );
    console.log("Fetched reviews:", reviews);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
});

module.exports = router;
