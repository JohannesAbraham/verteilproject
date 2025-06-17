const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Suggestions', SuggestionSchema);