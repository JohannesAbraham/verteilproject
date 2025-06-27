const express = require('express');
const router = express.Router();
const QuizQuestionModel = require('../models/QuizQuestion');

router.get('/', async (req, res) => {
  try {
    const quizQuestion = await QuizQuestionModel.find(); 
    res.json(quizQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    await QuizQuestionModel(req.body).save();
    res.json({ message: "Added Suggestion Successfully!" });
    console.log({ message: "Added Suggestion Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSuggestion = await QuizQuestionModel.findByIdAndDelete(req.params.id);
    
    if (!deletedSuggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    
    res.json({ 
      message: "Suggestion Deleted Successfully!",
      suggestion: deletedSuggestion
    });
    console.log({ message: "Suggestion Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
});
// Route 4: DELETE a question (Admin only)


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.query; // use query param, since DELETE doesn't usually handle body well

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  try {
    const deleted = await QuizQuestion.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
});


module.exports = router;