// Sudoku.jsx
import { useState, useEffect } from 'react';
import './Sudoku.css';

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
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

    const board = Array(9).fill().map(() => Array(9).fill(0));
    solve(board);
    return board;
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
    const seed = `${today}-sudoku`;
    const fullBoard = generateFullBoard(seed);
    const puzzleBoard = removeCells(fullBoard);
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
    if (selectedCell) {
      const newBoard = [...board];
      newBoard[selectedCell.row][selectedCell.col] = num;
      setBoard(newBoard);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (!selectedCell) return;
    if (e.key >= '1' && e.key <= '9') {
      handleNumberInput(parseInt(e.key));
    } else if (["Backspace", "Delete", "0"].includes(e.key)) {
      handleNumberInput(0);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell]);

  const isInitialCell = (row, col) => initialBoard[row][col] !== 0;

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

  const isPuzzleComplete = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0 || !isCellValid(row, col)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCheckSolution = () => {
    if (isPuzzleComplete()) {
      setMessage(`🎉 Well done, ${name}! You solved it in ${formatTime(timeElapsed)}.`);
      const results = JSON.parse(localStorage.getItem("sudoku-results") || "{}");
      const today = new Date().toISOString().split('T')[0];
      results[today] = { name, time: timeElapsed };
      localStorage.setItem("sudoku-results", JSON.stringify(results));
    } else {
      setMessage('❌ There are mistakes. Keep trying!');
    }
  };

  const renderResults = () => {
    const results = JSON.parse(localStorage.getItem("sudoku-results") || "{}");
    return Object.entries(results).map(([date, { name, time }]) => (
      <div key={date}>{`${date} - ${name}: ${formatTime(time)}`}</div>
    ));
  };

  if (showStartScreen) {
    return (
      <div className="sudoku-wrapper">
        <div className="start-screen">
          <h1 className='header-text'>Welcome to Sudoku</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
          <button onClick={() => setShowResults(true)}>View Results</button>
          {showResults && <div className="results-modal">{renderResults()}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="sudoku-wrapper">
      <div className="timer-container">⏱ {formatTime(timeElapsed)}</div>
      <div className="sudoku-container">
        <h1 className="centered-heading">Sudoku</h1>
        <div className="controls">
          <button onClick={handleCheckSolution}>Check Solution</button>
        </div>
        {message && <div className="message">{message}</div>}
        <div className="sudoku-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell 
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''}
                    ${!isCellValid(rowIndex, colIndex) && !isInitialCell(rowIndex, colIndex) ? 'invalid' : ''}
                    ${(rowIndex + 1) % 3 === 0 && rowIndex < 8 ? 'thick-border-bottom' : ''}
                    ${(colIndex + 1) % 3 === 0 && colIndex < 8 ? 'thick-border-right' : ''}
                    ${isInitialCell(rowIndex, colIndex) ? 'initial-cell' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
