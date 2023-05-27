const mongoose = require("mongoose");

const HomeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    audio: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", HomeSchema);
