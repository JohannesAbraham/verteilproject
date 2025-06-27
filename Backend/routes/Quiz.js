const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion');

// GET all quiz questions
router.get('/', async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new quiz question
router.post('/add', async (req, res) => {
  try {
    const newQuestion = new QuizQuestion(req.body);
    await newQuestion.save();
    res.json({ message: "Question added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a question with admin password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Replace with real secure method in production

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.query;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  try {
    console.log(`Attempting to delete question with ID: ${id}`);
    const deleted = await QuizQuestion.findByIdAndDelete(id);
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
  const { password, ...updateData } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password',
     });
  }

  try {
    const updatedQuestion = await QuizQuestion.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update question' });
  }
}
)

module.exports = router;
