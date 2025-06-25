const express = require("express");
const router = express.Router();
const ThoughtWord = require("../models/ThoughtWord");

require('dotenv').config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Get current thought & word
router.get("/", async (req, res) => {
  try {
    const data = await ThoughtWord.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update thought & word (admin-only)
router.post("/update", async (req, res) => {
  const { thought, author, word, meaning, password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    let entry = await ThoughtWord.findOne();
    if (!entry) {
      entry = new ThoughtWord({ thought, author, word, meaning });
    } else {
      entry.thought = thought;
      entry.author = author;
      entry.word = word;
      entry.meaning = meaning;
    }
    await entry.save();
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
