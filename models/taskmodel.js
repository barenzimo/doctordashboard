const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  reminder: {
    type: Boolean,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("task", taskSchema);
