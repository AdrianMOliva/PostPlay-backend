const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: Array,
  cover: String,
  developer: String,
  platforms: Array,
  first_release_date: Date,
  follows: Number,
  summary: String,
  hypes: Number,
});

const Game = model("Game", gameSchema);

module.exports = Game;
