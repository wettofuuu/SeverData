const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: Number,
  audio: Number,
  userProgress: Number,
});

module.exports = mongoose.model("User", userSchema);