const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: String,
  genres: Array,
  covers: { type: Schema.Types.ObjectId, ref: "Cover" },
  platforms: Array,
  follows: Number,
  summary: String,
  hypes: Number,
  ratings: Array,
  backlog: Boolean,
});

const Game = model("Game", gameSchema);

module.exports = Game;
