import React, { useState, useEffect } from 'react';
import './Popupquiz.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Saturn", "Mars", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "12", "13", "11"],
    answer: "12",
  },
  {
    question: "Who wrote Hamlet?",
    options: ["Shakespeare", "Dante", "Chaucer", "Homer"],
    answer: "Shakespeare",
  },
  {
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What is the boiling point of water?",
    options: ["100°C", "90°C", "110°C", "80°C"],
    answer: "100°C",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
    answer: "Da Vinci",
  },
];

const PopupQuiz = () => {
  const [started, setStarted] = useState(false);
  const [currentQn, setCurrentQn] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          setSubmitted(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted]);

  const handleOptionSelect = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQn]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = Object.entries(selectedOptions).reduce((acc, [index, value]) => {
    return value === questions[index].answer ? acc + 1 : acc;
  }, 0);

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

  return (
    <div className="quiz-container">
      {!started ? (
        <button className="start-button" onClick={() => setStarted(true)}>Start Quiz</button>
      ) : submitted ? (
        <div className="result-section">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button className="start-button" onClick={() => {
            setStarted(false);
            setSelectedOptions({});
            setCurrentQn(0);
            setTimeLeft(60);
            setSubmitted(false);
          }}>Restart</button>
        </div>
      ) : (
        <>
          <div className="timer">Time Left: {timeLeft}s</div>
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
      )}
    </div>
  );
};

export default PopupQuiz;
