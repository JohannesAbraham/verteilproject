const mongoose = require('mongoose');

const mediaBoxSchema = new mongoose.Schema({
    title:String,
    description: String,
    image: String,
})

module.exports = mongoose.model('MediaBox', mediaBoxSchema);