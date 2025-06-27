const express = require('express');
const router = express.Router();
const NewsModel = require('../models/News');

// GET all news articles
router.get('/', async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ publishDate: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST new news article with file upload
router.post('/', async (req, res) => {
  try {
    const { title, content, category, type } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      // Clean up uploaded file if validation fails
      if (req.file) await deleteFile(req.file.path);
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newArticle = await NewsModel.create({
      title,
      content,
      category: category || 'company',
      type: type || 'primary',
    });

    res.status(201).json(newArticle);
  } catch (err) {
    // Clean up file if error occurs after upload
    res.status(400).json({ 
      message: err.message,
      errors: err.errors
    });
  }
});

// PUT update news article with optional file upload
router.put('/:id', async (req, res) => {
  try {

    console.log(req.body)
    const { title, content, category, type } = req.body;
    const updateData = { title, content, category, type };

    

    const updatedArticle = await NewsModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    

    res.json(updatedArticle);
  } catch (err) {
    // Clean up new file if error occurs
    if (req.file) await deleteFile(req.file.path);
    res.status(400).json({ 
      message: err.message,
      errors: err.errors
    });
  }
});

// DELETE news article
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await NewsModel.findByIdAndDelete(req.params.id);
    
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Delete associated image file if exists
    

    res.json({ 
      message: "Article deleted successfully",
      article: deletedArticle
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;