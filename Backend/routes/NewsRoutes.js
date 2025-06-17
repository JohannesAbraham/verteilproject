const express = require('express');
const router = express.Router();
const NewsModel = require('../models/News');

router.get('/', async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ publishDate: -1 }); 
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    await NewsModel(req.body).save();
    res.json({ message: "Added News Article Successfully!" });
    console.log({ message: "Added News Article Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await NewsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    
    if (!updatedArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    
    res.json({ 
      message: "News Article Updated Successfully!",
      article: updatedArticle
    });
    console.log({ message: "News Article Updated Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await NewsModel.findByIdAndDelete(req.params.id);
    
    if (!deletedArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    
    res.json({ 
      message: "News Article Deleted Successfully!",
      article: deletedArticle
    });
    console.log({ message: "News Article Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

module.exports = router;