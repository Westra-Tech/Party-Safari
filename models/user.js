const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  // other fields... too lazy to implement it rn
});

module.exports = mongoose.model("User", UserSchema);
