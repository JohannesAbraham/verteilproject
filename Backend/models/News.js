const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publishDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  category: { type: String, enum: ['Company', 'Airline Domain', 'event'] }
});

module.exports = mongoose.model('News', NewsSchema);