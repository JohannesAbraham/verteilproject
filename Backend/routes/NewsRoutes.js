const express = require('express');
const router = express.Router();
const NewsModel = require('../models/News');

// @route   GET api/news
// @desc    Get all news items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ publishDate: -1 }); // -1 for descending (newest first)
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;