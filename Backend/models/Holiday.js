const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Holiday", HolidaySchema);
