import { useState, useEffect } from 'react';
import './Sudoku.css';

const SudokuBoard = () => {
  const emptyBoard = Array(9).fill().map(() => Array(9).fill(0));
  
  const [board, setBoard] = useState(emptyBoard);
  const [initialBoard, setInitialBoard] = useState(emptyBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);

  const generateNewPuzzle = () => {
    const examplePuzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    const newBoard = JSON.parse(JSON.stringify(examplePuzzle));
    setBoard(newBoard);
    setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    setGameStarted(true);
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
      if (isPuzzleComplete(newBoard)) {
        setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (selectedCell) {
      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
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
        if (r !== row && c !== col && board[r][c] === value) return false;
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
      </div>

      <div className="board-and-pad">
        <div className="sudoku-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell 
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''}
                    ${!isCellValid(rowIndex, colIndex) ? 'invalid' : ''}
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

        <div className="number-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button key={num} className="number-button" onClick={() => handleNumberInput(num)}>
              {num}
            </button>
          ))}
          <button className="number-button clear-button" onClick={() => handleNumberInput(0)}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SudokuBoard;
