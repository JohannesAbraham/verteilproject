const express = require('express');
const router = express.Router();
const fs = require('fs');
const QuizQuestionModel = require('../models/QuizQuestion');

require('dotenv').config();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const LEADERBOARD_FILE = './leaderboard.json'; // file to store leaderboard data

// GET all quiz questions
router.get('/', async (req, res) => {
  try {
    const quizQuestions = await QuizQuestionModel.find(); 
    res.json(quizQuestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST: Submit quiz answers and save to leaderboard
router.post('/submit', async (req, res) => {
  const { name, answers, timeTaken } = req.body;

  if (!name || !answers) {
    return res.status(400).json({ error: 'Name and answers are required' });
  }

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

    // Load existing leaderboard
    let leaderboard = [];
    if (fs.existsSync(LEADERBOARD_FILE)) {
      leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf-8'));
    }

    // Add new entry
    leaderboard.push({ name, score, timeTaken, date: new Date().toISOString() });

    // Sort by score (desc), then by timeTaken (asc)
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    // Keep only top 5
    leaderboard = leaderboard.slice(0, 5);

    // Save back
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboard, null, 2));

    res.json({ score, correctAnswers: questions.map(q => q.answer) });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ error: 'Failed to evaluate quiz' });
  }
});

// GET leaderboard
router.get('/leaderboard', (req, res) => {
  try {
    if (!fs.existsSync(LEADERBOARD_FILE)) {
      return res.json([]);
    }
    const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf-8'));
    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});
// GET leaderboard filtered by date
router.get('/leaderboard/by-date', (req, res) => {
  const { date } = req.query;
  try {
    if (!fs.existsSync(LEADERBOARD_FILE)) {
      return res.json([]);
    }
    let leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf-8'));

    if (date) {
      // Check only date part (ignore time)
      leaderboard = leaderboard.filter(entry =>
        entry.date && entry.date.startsWith(date)
      );
    }

    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Admin: Add question
router.post('/add', async (req, res) => {
  try {
    const saved = await QuizQuestionModel(req.body).save();
    res.json({ message: "Added successfully!", newQuestion: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update question
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { password, ...updateData } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  try {
    const updated = await QuizQuestionModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Updated successfully', updatedQuestion: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

// Admin: Delete question
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.query;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized: Invalid password' });
  }

  try {
    const deleted = await QuizQuestionModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

module.exports = router;
