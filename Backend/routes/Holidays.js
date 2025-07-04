const express = require("express");
const router = express.Router();
const Holiday = require("../models/Holiday");

// GET all holidays
router.get("/", async (req, res) => {
  const holidays = await Holiday.find();
  res.json(holidays);
});

// POST new holiday
router.post("/", async (req, res) => {
  const { name, date } = req.body;
  const newHoliday = new Holiday({ name, date });
  await newHoliday.save();
  res.status(201).json(newHoliday);
});

// PUT update holiday
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  const updated = await Holiday.findByIdAndUpdate(id, { name, date }, { new: true });
  res.json(updated);
});

// DELETE a holiday
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Holiday.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
});

module.exports = router;
