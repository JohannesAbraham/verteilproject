const express = require('express');
const router = express.Router();
const QuizQuestionModel = require('../models/QuizQuestion');

require('dotenv').config();

// GET all quiz questions
router.get('/', async (req, res) => {
  try {
    const quizQuestion = await QuizQuestionModel.find(); 
    res.json(quizQuestion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new quiz question
// POST a new quiz question
router.post('/add', async (req, res) => {
  try {
    const saved = await QuizQuestionModel(req.body).save();
    res.json({ message: "Added successfully!", newQuestion: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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
  const { password } = req.query;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  try {
    console.log(`Attempting to delete question with ID: ${id}`);
    const deleted = await QuizQuestionModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.log(`Error deleting question with ID ${id}:`, err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

// PUT to update a question
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  console.log(data)


  if (data.password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password',
     });
  }
 const { password, ...updateData } = data;
  try {
    const updatedQuestion = await QuizQuestionModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({
  message: 'Updated successfully',
  updatedQuestion,
});
  } catch (err) {
    res.status(500).json({ error: 'Failed to update question' });
    console.log(err);
  }
}
)

// POST: Submit quiz answers and return score
router.post('/submit', async (req, res) => {
  const { answers } = req.body;

  try {
    const questions = await QuizQuestionModel.find();

    let score = 0;
    questions.forEach((question, index) => {
      const correct = (question.answer || "").trim().toLowerCase();
      const userAnswer = (answers[index] || "").trim().toLowerCase();

      if (correct === userAnswer) {
        score++;
      }
    });

    res.json({ score });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Failed to evaluate quiz' });
  }
});


module.exports = router;
