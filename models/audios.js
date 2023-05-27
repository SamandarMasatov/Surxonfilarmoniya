const mongoose = require("mongoose");

const AudioSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    audio: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Audio", AudioSchema);
