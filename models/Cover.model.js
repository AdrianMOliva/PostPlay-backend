const { Schema, model } = require("mongoose");

const coverSchema = new Schema({
  image_id: String,
  url: String,
  game: [{ type: Schema.Types.ObjectId, ref: "Game" }],
});

const Cover = model("Cover", coverSchema);

module.exports = Cover;
