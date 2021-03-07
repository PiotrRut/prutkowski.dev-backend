const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the repository document
const Repo = new Schema({
  name: String,
  description: String,
  url: String,
  language: String,
  stars: Number,
  forks: Number,
  created: Date,
  gitId: String,
});

module.exports = mongoose.model("Repo", Repo);
