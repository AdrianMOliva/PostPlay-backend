const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: Array,
  cover: String,
  platforms: Array,
  release_dates: Array,
  summary: String,
  hypes: Number,
});

const Game = model("Game", gameSchema);

module.exports = Game;
