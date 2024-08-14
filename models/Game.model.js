const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: [String],
  covers: String,
  platforms: [String],
  follows: Number,
  summary: String,
  hypes: Number,
  ratings: [Number],
  backlog: Boolean,
});

const Game = model("Game", gameSchema);

module.exports = Game;
