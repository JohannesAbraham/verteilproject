import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Games.css';
import ExtensionIcon from '@mui/icons-material/Extension';
import QuizIcon from '@mui/icons-material/Quiz';

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      name: 'Sudoku',
      path: '/quickgames/sudoku',
      logo: ExtensionIcon,
      leaderboardKey: 'sudoku-leaderboard',
    },
    {
      name: 'Pop Quiz',
      path: '/quickgames/popquiz',
      logo: QuizIcon,
      leaderboardKey: 'popquiz-leaderboard',
    },
  ];
  /*
  const [sudokuScores, setSudokuScores] = useState([]);
  const [quizScores, setQuizScores] = useState([]);

  useEffect(() => {
    const sudokuData = JSON.parse(localStorage.getItem('sudoku-leaderboard') || '[]')
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 5);

    const quizData = JSON.parse(localStorage.getItem('popquiz-leaderboard') || '[]')
      .sort((a, b) => b.score !== a.score ? b.score - a.score : a.timeTaken - b.timeTaken)
      .slice(0, 5);

    setSudokuScores(sudokuData);
    setQuizScores(quizData);
  }, []);

  const getRankIcon = (index) => {
    return index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`;
  };*/

  return (
    <div className="game-list-wrapper">
      <h1 className="game-list-title">Choose Your Game</h1>
      <div className="game-card-container">
        {games.map((game, index) => (
          <div
            key={index}
            className={`game-card ${index === 0 ? 'slide-left' : 'slide-right'}`}
            onClick={() => navigate(game.path)}
          >
            <game.logo className="game-logo" />
            <div className="game-name">{game.name}</div>
          </div>
        ))}
      </div>
      {/*
      <h2 className="scoreboard-title">Top Performers</h2>
      <div className="scoreboard-wrapper">
        <div className="scoreboard fade-in">
          <h3>Sudoku</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {sudokuScores.length > 0 ? (
                sudokuScores.map((player, index) => (
                  <tr key={index}>
                    <td>{getRankIcon(index)}</td>
                    <td>{player.name}</td>
                    <td>{player.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No records yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="scoreboard fade-in" style={{ animationDelay: '0.3s' }}>
          <h3>Pop Quiz</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {quizScores.length > 0 ? (
                quizScores.map((player, index) => (
                  <tr key={index}>
                    <td>{getRankIcon(index)}</td>
                    <td>{player.name}</td>
                    <td>{player.timeTaken ? `${player.timeTaken}s` : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No records yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      */}
    </div>
  );
};

export default Games;
