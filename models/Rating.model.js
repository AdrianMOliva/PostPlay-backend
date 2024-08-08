const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  rating: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  review: String,
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
