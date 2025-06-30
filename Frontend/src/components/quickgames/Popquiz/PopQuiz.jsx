import React, { useState, useEffect } from 'react';
import './Popquiz.css';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PopupQuiz = () => {
  const [started, setStarted] = useState(false);
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQn, setCurrentQn] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetchLeaderboard(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (started && questions.length === 0) {
      axios.get('http://localhost:5000/api/quiz')
        .then(res => {
          setQuestions(res.data);
          setStartTime(Date.now());
        })
        .catch(err => console.error('Error fetching quiz:', err));
    }
  }, [started]);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  const fetchLeaderboard = (date) => {
    axios.get(`http://localhost:5000/api/quiz/leaderboard?date=${date}`)
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQn]: option });
  };

  const handleSubmit = () => {
    const orderedAnswers = questions.map((_, index) => selectedOptions[index] || "");
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    axios.post('http://localhost:5000/api/quiz/submit', {
      name: name || 'Anonymous',
      answers: orderedAnswers,
      timeTaken,
    })
      .then(res => {
        setScore(res.data.score);
        setCorrectAnswers(res.data.correctAnswers);
        setSubmitted(true);
        fetchLeaderboard(selectedDate);
      })
      .catch(err => console.error('Error submitting answers:', err));
  };

  const restartQuiz = () => {
    setStarted(false);
    setQuestions([]);
    setSelectedOptions({});
    setCurrentQn(0);
    setTimeLeft(60);
    setStartTime(null);
    setSubmitted(false);
    setScore(0);
    setCorrectAnswers([]);
  };

  return (
    <div className="popquizwrapper">
      {!started ? (
        <div className="start-screen">
          <h2>Popup Quiz</h2>
          <input
  type="text"
  placeholder="Your name"
  value={name}
  onChange={e => setName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && name.trim() !== "") {
      setStarted(true);
    }
  }}
/>
          
          <div>
            <button
              className="start-button"
              onClick={() => {
                if (name.trim() !== "") setStarted(true);
              }}
            >
              Start Game
            </button>
            <button
              className="start-button"
              onClick={() => setShowHowToPlay(!showHowToPlay)}
            >
              How to Play
            </button>
          </div>
          {showHowToPlay && (
            <div className="how-to-play">
              <p>Answer all questions carefully. Click on options to select, then navigate using Next or Submit.</p>
            </div>
          )}

          <h3>Leaderboard</h3>
          <div className="date-icon" onClick={() => setShowDateFilter(!showDateFilter)}>
            <CalendarMonthIcon style={{ cursor: 'pointer' }} />
          </div>
          {showDateFilter && (
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          )}
          <div className="leaderboard-container">
            {leaderboard.length === 0 ? (
              <p className="no-results">No results yet</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard
                    .sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken)
                    .slice(0, 5)
                    .map((entry, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{entry.name}</td>
                        <td>{entry.score}</td>
                        <td>{entry.timeTaken}s</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : submitted ? (
        <div className="result-section">
          <h2>Result: {score} / {questions.length}</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => (
                <tr key={idx}>
                  <td>{q.question}</td>
                  <td>{correctAnswers[idx]}</td>
                  <td>{selectedOptions[idx] || "No answer"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="restart-button" onClick={restartQuiz}>Restart</button>
        </div>
      ) : questions.length > 0 ? (
        <div className="quiz-container">
          <div className="timer">Time: {timeLeft}s</div>
          <div className="question-box">
            <h3>{questions[currentQn].question}</h3>
            <ul className="options-list">
              {questions[currentQn].options.map((opt, i) => (
                <li
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className={selectedOptions[currentQn] === opt ? "selected-option" : ""}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
          <div className="navigation-buttons">
            <button
              className="nav-button"
              onClick={() => setCurrentQn(Math.max(currentQn - 1, 0))}
              disabled={currentQn === 0}
            >
              Previous
            </button>
            <button
              className="nav-button"
              onClick={() => {
                if (currentQn < questions.length - 1) {
                  setCurrentQn(currentQn + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {currentQn === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div>Loading quiz...</div>
      )}
    </div>
  );
};

export default PopupQuiz;
