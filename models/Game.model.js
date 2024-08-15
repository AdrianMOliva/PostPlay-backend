const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: Array,
  covers: String,
  platforms: Array,
  follows: Number,
  summary: String,
  hypes: Number,
  ratings: Number,
  backlog: Boolean,
});

const Game = model("Game", gameSchema);

module.exports = Game;
