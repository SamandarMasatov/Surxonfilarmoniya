const mongoose = require("mongoose");

const TeamAboutSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TeamAbout", TeamAboutSchema);
