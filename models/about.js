const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema({
  name: {
    uz: { type: String, required: true },
    ru: { type: String, required: true },
  },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("About", AboutSchema);
