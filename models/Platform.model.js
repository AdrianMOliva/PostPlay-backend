const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const platformSchema = new Schema({
  image_id: String,
  url: String,
  game: { type: Schema.Types.ObjectId, ref: "Game" },
});

const Platform = mongoose.model("Platform", platformSchema);

module.exports = Platform;
