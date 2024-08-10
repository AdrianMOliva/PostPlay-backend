const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
  gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  rating: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  review: String,
});

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
