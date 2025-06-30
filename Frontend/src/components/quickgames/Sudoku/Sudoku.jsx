import React, { useState, useEffect } from 'react';
import './Sudoku.css';

const Sudoku = () => {
  const emptyBoard = Array(9).fill().map(() => Array(9).fill(0));
  const [board, setBoard] = useState(emptyBoard);
  const [initialBoard, setInitialBoard] = useState(emptyBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [name, setName] = useState('');
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  useEffect(() => {
    const stored = localStorage.getItem('sudoku-leaderboard');
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const createSeededRandom = (seed) => {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    }
    return () => {
      h ^= h >>> 13;
      h = Math.imul(h, 2246822507);
      h ^= h >>> 15;
      return (h >>> 0) / 4294967296;
    };
  };

  const generateFullBoard = (seed) => {
    const random = createSeededRandom(seed);
    const isSafe = (board, row, col, num) => {
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
      }
      const startRow = row - (row % 3);
      const startCol = col - (col % 3);
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (board[r][c] === num) return false;
        }
      }
      return true;
    };
    const solve = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => random() - 0.5);
            for (let num of nums) {
              if (isSafe(board, row, col, num)) {
                board[row][col] = num;
                if (solve(board)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    const newBoard = Array(9).fill().map(() => Array(9).fill(0));
    solve(newBoard);
    return newBoard;
  };

  const removeCells = (board) => {
    const puzzle = JSON.parse(JSON.stringify(board));
    let removed = 0;
    while (removed < 45) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    return puzzle;
  };

  const startGame = () => {
    if (name.trim() === '') {
      alert('Please enter your name');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const localKey = `sudoku-puzzle-${today}`;
    let storedPuzzle = localStorage.getItem(localKey);

    let puzzleBoard, fullBoard;

    if (storedPuzzle) {
      const parsed = JSON.parse(storedPuzzle);
      puzzleBoard = parsed.puzzle;
      fullBoard = parsed.full;
    } else {
      const seed = `${today}-sudoku`;
      fullBoard = generateFullBoard(seed);
      puzzleBoard = removeCells(fullBoard);
      localStorage.setItem(localKey, JSON.stringify({ puzzle: puzzleBoard, full: fullBoard }));
    }

    setBoard(puzzleBoard);
    setInitialBoard(puzzleBoard);
    setTimeElapsed(0);
    setSelectedCell(null);
    setGameStarted(true);
    setMessage('');
    setShowStartScreen(false);
  };

  const handleCellClick = (row, col) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num) => {
    if (selectedCell && initialBoard[selectedCell.row][selectedCell.col] === 0) {
      const newBoard = board.map((r) => r.slice());
      newBoard[selectedCell.row][selectedCell.col] = num;
      setBoard(newBoard);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (!selectedCell || showStartScreen) return;
    if (e.key >= '1' && e.key <= '9') {
      handleNumberInput(parseInt(e.key));
    } else if (["Backspace", "Delete", "0"].includes(e.key)) {
      handleNumberInput(0);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, showStartScreen]);

  const handleClear = () => {
    if (selectedCell && initialBoard[selectedCell.row][selectedCell.col] === 0) {
      handleNumberInput(0);
    }
  };

  const handleCheckSolution = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0 || !isCellValid(row, col)) {
          setMessage('❌ Keep trying!');
          return;
        }
      }
    }

    const newRecord = { name, time: formatTime(timeElapsed), date: new Date().toLocaleDateString() };
    const updatedLeaderboard = [...leaderboard, newRecord].sort((a, b) => (a.time > b.time ? 1 : -1)).slice(0, 10);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('sudoku-leaderboard', JSON.stringify(updatedLeaderboard));

    setMessage(`🎉 Well done! Completed in ${formatTime(timeElapsed)}!`);
  };

  const isCellValid = (row, col) => {
    const value = board[row][col];
    if (value === 0) return true;
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) return false;
      }
    }
    return true;
  };

  const renderNumberPad = () => (
    <div className="number-pad">
      {Array.from({ length: 9 }, (_, i) => (
        <button key={i + 1} onClick={() => handleNumberInput(i + 1)} className="number-btn">
          {i + 1}
        </button>
      ))}
    </div>
  );

  return showStartScreen ? (
    <div className="sudoku-wrapper">
      <div className="start-screen">
        <h1>Sudoku</h1>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && startGame()}
        />
        <div className="button-group">
          <button onClick={startGame}>Start Game</button>
          <button onClick={() => setShowHowToPlay(!showHowToPlay)}>How to Play</button>
        </div>
        {showHowToPlay && (
          <div className="how-to-play">
            <p>✔ Fill each row, column, and 3×3 box with numbers 1–9.</p>
            <p>✔ Numbers must not repeat in any row, column, or box.</p>
            <p>✔ Use the number pad or keyboard to fill cells.</p>
            <p>✔ Click Check to validate your solution anytime.</p>
          </div>
        )}
        <h3>Leaderboard</h3>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.time}</td>
                  <td>{entry.date}</td>
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
  ) : (
    <div className="sudoku-wrapper">
      <div className="game-container">
        <div className="headerss">
          <h2>Sudoku</h2>
          <div className="timer">Time: {formatTime(timeElapsed)}</div>
        </div>
        <div className="controls-row">
          <button onClick={handleCheckSolution}>Check</button>
          <button onClick={handleClear} disabled={!selectedCell}>Erase</button>
          <button onClick={() => setShowStartScreen(true)}>Main Menu</button>
        </div>
        {message && <div className="message">{message}</div>}
        <div className="sudoku-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell 
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''}
                    ${!isCellValid(rowIndex, colIndex) ? 'invalid' : ''}
                    ${initialBoard[rowIndex][colIndex] !== 0 ? 'prefilled' : ''}
                    ${(rowIndex + 1) % 3 === 0 ? 'thick-border-bottom' : ''}
                    ${(colIndex + 1) % 3 === 0 ? 'thick-border-right' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
        {renderNumberPad()}
      </div>
    </div>
  );
};

export default Sudoku;
