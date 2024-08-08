const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: Array,
  covers: [{ type: Schema.Types.ObjectId, ref: "Cover" }],
  developer: String,
  platforms: Array,
  follows: Number,
  summary: String,
  hypes: Number,
  ratings: Array,
});

const Game = model("Game", gameSchema);

module.exports = Game;
