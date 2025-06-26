import { useState, useEffect } from 'react';
import './Sudoku.css';

const Sudoku = () => {
  const emptyBoard = Array(9).fill().map(() => Array(9).fill(0));

  const [board, setBoard] = useState(emptyBoard);
  const [initialBoard, setInitialBoard] = useState(emptyBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer logic
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

  const generateFullBoard = () => {
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
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
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

  const removeCells = (board, level) => {
    const attempts = { easy: 35, medium: 45, hard: 55 };
    const puzzle = JSON.parse(JSON.stringify(board));
    let removed = 0;
    while (removed < attempts[level]) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    return puzzle;
  };

  const generateNewPuzzle = () => {
    const fullBoard = generateFullBoard();
    const puzzleBoard = removeCells(fullBoard, difficulty);
    setBoard(puzzleBoard);
    setInitialBoard(JSON.parse(JSON.stringify(puzzleBoard)));
    setGameStarted(true);
    setSelectedCell(null);
    setMessage('');
    setTimeElapsed(0);
  };

  useEffect(() => {
    generateNewPuzzle();
  }, [difficulty]);

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
    } else if (['Backspace', 'Delete', '0'].includes(e.key)) {
      handleNumberInput(0);
    } else if (e.key === 'ArrowUp' && selectedCell.row > 0) {
      setSelectedCell(prev => ({ ...prev, row: prev.row - 1 }));
    } else if (e.key === 'ArrowDown' && selectedCell.row < 8) {
      setSelectedCell(prev => ({ ...prev, row: prev.row + 1 }));
    } else if (e.key === 'ArrowLeft' && selectedCell.col > 0) {
      setSelectedCell(prev => ({ ...prev, col: prev.col - 1 }));
    } else if (e.key === 'ArrowRight' && selectedCell.col < 8) {
      setSelectedCell(prev => ({ ...prev, col: prev.col + 1 }));
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

  const isPuzzleComplete = (currentBoard) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0 || !isCellValid(row, col)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCheckSolution = () => {
    if (isPuzzleComplete(board)) {
      setMessage('🎉 Great job! You solved it correctly.');
    } else {
      setMessage('❌ There are mistakes. Keep trying!');
    }
  };

  if (!gameStarted) return <div className="loading">Loading Sudoku...</div>;

  return (
    <div className="sudoku-container">
      <h1>Sudoku Game</h1>

      <div className="controls">
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={generateNewPuzzle}>New Game</button>
        <button onClick={handleCheckSolution}>Check Solution</button>
        <div className="timer-container">⏱: {formatTime(timeElapsed)}</div>

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
                  ${isInitialCell(rowIndex, colIndex) ? 'initial-cell' : ''}
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sudoku;
