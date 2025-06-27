import React from 'react';
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
    },
    {
      name: 'Pop Quiz',
      path: '/quickgames/popquiz',
      logo: QuizIcon,
    },
  ];

  const sudokuScores = [
    { name: "Alice", time: "1:42" },
    { name: "Bob", time: "1:55" },
    { name: "Charlie", time: "2:03" },
    { name: "Daisy", time: "2:17" },
    { name: "Ethan", time: "2:25" },
  ];

  const quizScores = [
    { name: "Isha", time: "40s" },
    { name: "Rahul", time: "43s" },
    { name: "Neha", time: "47s" },
    { name: "Arun", time: "50s" },
    { name: "Sanya", time: "55s" },
  ];

  const getRankIcon = (index) => {
    return index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`;
  };

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
              {sudokuScores.map((player, index) => (
                <tr key={index}>
                  <td>{getRankIcon(index)}</td>
                  <td>{player.name}</td>
                  <td>{player.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="scoreboard fade-in" style={{ animationDelay: '0.3s' }}>
          <h3>Popup Quiz</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {quizScores.map((player, index) => (
                <tr key={index}>
                  <td>{getRankIcon(index)}</td>
                  <td>{player.name}</td>
                  <td>{player.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Games;
