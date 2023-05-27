const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
