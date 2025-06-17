import { useState, useEffect } from 'react';
import './PopupQuiz.css';

const PopupQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    }
  ];

  // Timer countdown
  useEffect(() => {
    if (showQuiz && timer > 0) {
      const countdown = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleAnswer(null); // No answer selected, move on
    }
  }, [showQuiz, timer]);

  const startQuiz = () => {
    setShowQuiz(true);
    setScore(0);
    setCurrentQuestion(0);
    setTimer(15);
  };

  const handleAnswer = (selectedAnswer) => {
    let updatedScore = score;

    if (selectedAnswer === questions[currentQuestion].answer) {
      updatedScore++;
      setScore(updatedScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(15);
    } else {
      setShowQuiz(false);
      alert(`Quiz finished! Your score: ${updatedScore}/${questions.length}`);
    }
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimer(15);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-button-wrapper">
        <button className="quiz-button" onClick={startQuiz}>Start Quiz</button>
      </div>

      {showQuiz && (
        <div className="quiz-popup">
          <div className="quiz-content">
            <button className="close-button" onClick={closeQuiz}>✖</button>
            <div className="quiz-header">
              <h3>Question {currentQuestion + 1}</h3>
              <div className="timer">⏱️ {timer}s</div>
            </div>
            <p className="question-text">{questions[currentQuestion].question}</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupQuiz;
