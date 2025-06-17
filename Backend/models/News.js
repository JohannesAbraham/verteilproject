const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  publishDate: { type: Date, default: Date.now },
  category: { type: String, enum: ['Company', 'Airline Domain', 'event'] }
});

module.exports = mongoose.model('News', NewsSchema);