const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coverSchema = new Schema({
  image_id: String,
  url: String,
  game: { type: Schema.Types.ObjectId, ref: "Game" },
});

const Cover = mongoose.model("Cover", coverSchema);

module.exports = Cover;
