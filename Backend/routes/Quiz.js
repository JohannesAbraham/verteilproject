const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion');
require('dotenv').config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Route 1: GET all questions
router.get('/', async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Route 2: POST new question (Admin only)
router.post('/add', async (req, res) => {
  const { password, question, options, answer } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  if (!question || !options || !answer || options.length < 2) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const newQn = new QuizQuestion({ question, options, answer });
    await newQn.save();
    res.json({ message: 'Question added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add question' });
  }
});

// Route 3: POST answers and calculate score
router.post('/submit', async (req, res) => {
  try {
    const userAnswers = req.body.answers;
    const questions = await QuizQuestion.find();

    let score = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] && userAnswers[index] === q.answer) {
        score++;
      }
    });

    res.json({ score });
  } catch (err) {
    res.status(500).json({ error: 'Failed to evaluate quiz' });
  }
});

// Optional: Add routes to update or delete questions

module.exports = router;
