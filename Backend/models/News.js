const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true, // Ensure uniqueness of the query field
  },
  text: {
    type: String,
    required: true,
  },
});

const newsModel = mongoose.model("news", NewsSchema);
module.exports = newsModel;