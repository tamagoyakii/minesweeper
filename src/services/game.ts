import { Element, FlagTypes } from 'src/types/gameTypes';

const moveRow = [0, 0, 1, -1, 1, -1, -1, 1];
const moveCol = [1, -1, 0, 0, 1, -1, 1, -1];

export const initBoard = (width: number, height: number) => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      element: 0,
      isRevealed: false,
      flagType: 'blank' as FlagTypes,
    }))
  );
};

export const plantBombs = (
  board: Element[][],
  mines: number,
  startRow: number,
  startCol: number
) => {
  const height = board.length;
  const width = board[0].length;

  while (mines) {
    const row = Math.floor(Math.random() * height);
    const col = Math.floor(Math.random() * width);

    if (col === startCol && row === startRow) continue;
    if (Math.abs(col - startCol) <= 1 && Math.abs(row - startRow) <= 1)
      continue;
    if (board[row][col].element === -1) continue;

    board[row][col].element = -1;
    for (let i = 0; i < 8; i++) {
      const newRow = row + moveRow[i];
      const newCol = col + moveCol[i];
      if (newCol < 0 || newCol >= width || newRow < 0 || newRow >= height)
        continue;
      if (board[newRow][newCol].element === -1) continue;
      board[newRow][newCol].element++;
    }
    mines--;
  }
};

export const dfs = (board: Element[][], row: number, col: number) => {
  const height = board.length;
  const width = board[0].length;

  if (col < 0 || col >= width || row < 0 || row >= height) return 0;
  if (board[row][col].isRevealed) return 0;
  if (board[row][col].element === -1) return 0;
  if (board[row][col].flagType === 'bombflagged') return 0;

  let revealedMine = 1;
  board[row][col].isRevealed = true;
  if (board[row][col].element === 0) {
    for (let i = 0; i < 8; i++) {
      const newRow = row + moveRow[i];
      const newCol = col + moveCol[i];
      revealedMine += dfs(board, newRow, newCol);
    }
  }
  return revealedMine;
};

export const openAdjacentArea = (
  board: Element[][],
  row: number,
  col: number
) => {
  const height = board.length;
  const width = board[0].length;
  const elements = [];
  let exploded = false;

  for (let i = 0; i < 8; i++) {
    const newRow = row + moveRow[i];
    const newCol = col + moveCol[i];
    if (newCol < 0 || newCol >= width || newRow < 0 || newRow >= height)
      continue;
    if (board[newRow][newCol].flagType === 'bombflagged') continue;
    if (board[newRow][newCol].element === -1) {
      board[newRow][newCol].element = -2;
      exploded = true;
    }
    elements.push([newRow, newCol]);
  }
  if (exploded) {
    elements.forEach(([row, col]) => {
      board[row][col].isRevealed = true;
    });
    return -1;
  }
  return elements.reduce((acc, [row, col]) => {
    if (board[row][col].element !== -1) {
      return acc + dfs(board, row, col);
    }
    return acc;
  }, 0);
};

export const revealBombs = (board: Element[][]) => {
  board.forEach((row) => {
    row.forEach((el) => {
      if (el.flagType === 'bombflagged' && el.element !== -1) {
        el.element = -3;
      }
      if (el.element < 0) {
        el.isRevealed = true;
      }
    });
  });
};
