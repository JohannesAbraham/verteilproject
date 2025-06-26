const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  category: { type: String, enum: [
    'General',
    'Product',
    'Tech and Tools',
    'Training',
    'Finance',
    'Policies',
    "HR and People's Operations"
  ] },
  content: { type: String, required: true },
  empId: { type: String, required: true},
  publishDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Suggestions', SuggestionSchema);