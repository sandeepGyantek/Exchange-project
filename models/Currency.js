const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
  threeDigitName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("currency", CurrencySchema);
