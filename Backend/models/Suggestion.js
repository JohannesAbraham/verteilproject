const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  category: { type: String, enum: ['Company', 'Airline Domain', 'event'] }
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);