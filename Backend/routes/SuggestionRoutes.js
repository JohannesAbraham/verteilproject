// Import required modules
const express = require('express');
const router = express.Router();
// const QuizQuestion = require('../models/QuizQuestion'); // Mongoose model
require('dotenv').config();

// Get admin password from .env
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// -----------------------------
// ROUTE: POST /api/quiz/add
// -----------------------------
// This route allows admin to add a quiz question
// Requires:
// {
//   password: "admin_password",
//   question: "Your question?",
//   options: ["A", "B", "C", "D"],
//   answer: "Correct Answer"
// }

router.post('/add', async (req, res) => {
  const { password, question, options, answer } = req.body;

  // Step 1: Validate admin password
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  // Step 2: Validate question data
  if (!question || !options || !answer || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Invalid input: question, options, and answer are required.' });
  }

  // Step 3: Save question to MongoDB
  try {
    const newQuestion = new QuizQuestion({ question, options, answer });
    await newQuestion.save();
    res.json({ message: 'Question added successfully' });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ error: 'Server error: failed to save question' });
  }
});

// -----------------------------
// ROUTE: GET /api/quiz
// -----------------------------
// Fetches all quiz questions (you can use this in frontend to get quiz data)
router.get('/', async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Server error: failed to fetch questions' });
  }
});

module.exports = router;
