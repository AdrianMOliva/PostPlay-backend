const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
