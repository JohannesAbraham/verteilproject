import { useState, useEffect, useRef } from 'react';
import './Sudoku.css';

const createEmptyBoard = () => Array(9).fill().map(() => Array(9).fill(0));

const isSafe = (board, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
};

const solveSudoku = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const fillBox = (board, row, col) => {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => 0.5 - Math.random());
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      board[row + r][col + c] = nums.pop();
    }
  }
};

const generateFullBoard = () => {
  const board = createEmptyBoard();
  fillBox(board, 0, 0);
  fillBox(board, 3, 3);
  fillBox(board, 6, 6);
  solveSudoku(board);
  return board;
};

const removeCells = (board, difficulty = 'medium') => {
  const puzzle = board.map(row => [...row]);
  let holes = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;
  let count = 0;
  while (count < holes) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count++;
    }
  }
  return puzzle;
};

const Sudoku = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [original, setOriginal] = useState(createEmptyBoard());
  const [difficulty, setDifficulty] = useState('medium');
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);
    timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
  };

  const generatePuzzle = () => {
    const full = generateFullBoard();
    const puzzle = removeCells(full, difficulty);
    setBoard(puzzle);
    setOriginal(puzzle.map(row => [...row]));
    setMessage('');
    startTimer();
  };

  useEffect(() => {
    generatePuzzle();
    return () => clearInterval(timerRef.current);
  }, [difficulty]);

  const handleChange = (r, c, value) => {
    const updated = board.map(row => [...row]);
    updated[r][c] = value;
    setBoard(updated);
  };

  const checkSolution = () => {
    const flat = board.flat();
    const isValid = flat.every((num, i) => {
      const row = Math.floor(i / 9);
      const col = i % 9;
      if (num === 0) return false;
      const tempBoard = board.map(r => [...r]);
      tempBoard[row][col] = 0;
      return isSafe(tempBoard, row, col, num);
    });

    setMessage(isValid ? '✅ Correct solution!' : '❌ Incorrect solution.');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="sudoku-wrapper">
      <h2 className="sudoku-title">Sudoku</h2>

      <div className="controls">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div className="timer">⏱ {formatTime(time)}</div>
      </div>

      <div className="sudoku-container">
        <div className="sudoku-board">
          {board.map((row, r) => (
            <div className="sudoku-row" key={r}>
              {row.map((cell, c) => {
                const isFixed = original[r][c] !== 0;
                return (
                  <input
                    key={c}
                    className={`sudoku-cell ${isFixed ? 'fixed' : ''}`}
                    value={cell || ''}
                    onChange={(e) =>
                      handleChange(r, c, parseInt(e.target.value) || 0)
                    }
                    disabled={isFixed}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="button-row">
          <button className="refresh-button" onClick={generatePuzzle}>New Puzzle</button>
          <button className="check-button" onClick={checkSolution}>Check Solution</button>
        </div>

        {message && <p className="result-message">{message}</p>}
      </div>
    </div>
  );
};

export default Sudoku;
