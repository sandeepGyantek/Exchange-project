const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  email: {
    type: String,
  },
  userId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    // required: true,
  },
  langauge: {
    type: String,
    // required: true,
  },
  currency: {
    type: String,
  },
  avatar: {
    type: String,
  },
  question1: {
    type: String,
  },
  answer1: {
    type: String,
  },
  question2: {
    type: String,
  },
  answer2: {
    type: String,
  },
  question3: {
    type: String,
  },
  answer3: {
    type: String,
  },
  twoFA: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
