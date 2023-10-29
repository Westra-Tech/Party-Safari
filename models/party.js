const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
  Name: String,
  Description: String,
  Location: String,
  PreciseLocation: String,
  Date: Date,
  StartTime: TimeRanges,
  EndTime: TimeRanges,
  Host: String,
  Price: Number,
  Guests: [String],
});

module.exports = mongoose.model("Party", PartySchema);
