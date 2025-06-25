const mongoose = require("mongoose");

const ThoughtWordSchema = new mongoose.Schema({
  thought: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Anonymous"
  },
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("ThoughtWord", ThoughtWordSchema);
