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

  if (col < 0 || col >= width || row < 0 || row >= height) return;
  if (board[row][col].isRevealed) return;
  if (board[row][col].element === -1) return;

  board[row][col].isRevealed = true;
  if (board[row][col].element === 0) {
    for (let i = 0; i < 8; i++) {
      const newRow = row + moveRow[i];
      const newCol = col + moveCol[i];
      dfs(board, newRow, newCol);
    }
  }
};
