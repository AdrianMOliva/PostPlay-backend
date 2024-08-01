const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: Array,
  covers: [{ type: Schema.Types.ObjectId, ref: "Cover" }],
  developer: String,
  platforms: [{ type: Schema.Types.ObjectId, ref: "Platform" }],
  follows: Number,
  summary: String,
  hypes: Number,
});

const Game = model("Game", gameSchema);

module.exports = Game;
