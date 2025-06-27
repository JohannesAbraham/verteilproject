const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true 
  },
  
  publishDate: { 
    type: Date, 
    default: Date.now 
  },
  category: { 
    type: String, 
    enum: ['company', 'airline', 'event'], // Changed to lowercase to match frontend
    default: 'company',
    required: true
  },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('News', NewsSchema);