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
      name: 'Popup Quiz',
      path: '/quickgames/popupquiz',
      logo: QuizIcon,
    },
  ];

  return (
    <div className="game-list-wrapper">
      <h1 className="game-list-title">Choose Your Game</h1>
      <div className="game-card-container">
        {games.map((game, index) => (
          <div
            key={index}
            className="game-card"
            onClick={() => navigate(game.path)}
          >
            <game.logo className="game-logo" />
            <div className="game-name">{game.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
