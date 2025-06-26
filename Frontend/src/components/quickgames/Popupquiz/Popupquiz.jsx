import React, { useState, useEffect } from 'react'; 
import './Popupquiz.css';

const PopupQuiz = () => {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQn, setCurrentQn] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Fetch quiz questions from backend
  useEffect(() => {
    if (started && questions.length === 0) {
      fetch('http://localhost:5000/api/quiz')
        .then(res => res.json())
        .then(data => setQuestions(data))
        .catch(err => console.error('Error fetching quiz:', err));
    }
  }, [started]);

  // Timer
  useEffect(() => {
    if (!started || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted]);

  // Handle option select
  const handleOptionSelect = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQn]: option });
  };

  // Submit answers to backend
  const handleSubmit = () => {
    setSubmitted(true);

    const orderedAnswers = questions.map((_, index) => selectedOptions[index] || "");

    fetch('http://localhost:5000/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: orderedAnswers }),
    })
      .then(res => res.json())
      .then(data => {
        setScore(data.score);
      })
      .catch(err => console.error('Error submitting answers:', err));
  };

  const goNext = () => {
    if (currentQn < questions.length - 1) {
      setCurrentQn(currentQn + 1);
    }
  };

  const goPrev = () => {
    if (currentQn > 0) {
      setCurrentQn(currentQn - 1);
    }
  };

  const restartQuiz = () => {
    setStarted(false);
    setQuestions([]);
    setSelectedOptions({});
    setCurrentQn(0);
    setTimeLeft(60);
    setSubmitted(false);
    setScore(null);
  };

  return (
    <div className="popupquizwrapper">

      
    <div className="quiz-container">
      {!started ? (
        <button className="start-button" onClick={() => setStarted(true)}>Start Quiz</button>
      ) : submitted ? (
        <div className="result-section">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button className="start-button" onClick={restartQuiz}>Restart</button>
        </div>
      ) : questions.length > 0 ? (
        <>
          <div className="timer">Time: {timeLeft}s</div>
          <div className="question-box">
            <h3>Q{currentQn + 1}. {questions[currentQn].question}</h3>
            <ul>
              {questions[currentQn].options.map((opt, i) => (
                <li
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className={selectedOptions[currentQn] === opt ? "selected" : ""}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
          <div className="navigation-buttons">
            <button onClick={goPrev} disabled={currentQn === 0} className="nav-button">Previous</button>
            <button onClick={goNext} disabled={currentQn === questions.length - 1} className="nav-button">Next</button>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        </>
      ) : (
        <div>Loading quiz...</div>
      )}
    </div>
    </div>
  );
};

export default PopupQuiz;
