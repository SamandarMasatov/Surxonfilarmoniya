const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    job: { type: String, required: true },
    image: { type: String, required: true },
    personel: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", TeamSchema);
