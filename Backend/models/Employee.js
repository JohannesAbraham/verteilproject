const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  joinDate: Date,
  birthDate: Date,
  image: String, // URL or base64 string
  email:String
});

module.exports = mongoose.model('Employee', employeeSchema);
