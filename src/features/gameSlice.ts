import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
  Custom = 'Custom',
}

export const difficultySettings = {
  [Difficulty.Beginner]: { rows: 8, cols: 8, mines: 10 },
  [Difficulty.Intermediate]: { rows: 16, cols: 16, mines: 40 },
  [Difficulty.Expert]: { rows: 16, cols: 32, mines: 100 },
  [Difficulty.Custom]: { rows: 0, cols: 0, mines: 0 },
};

interface CellData {
  element: number;
  isRevealed: boolean;
}

interface GameState {
  difficulty: Difficulty;
  board: CellData[][];
  plantedMines: number;
  remainingMines: number;
  time: number;
  isPlaying: boolean;
  exploded: boolean;
}

const initBoard = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ element: 0, isRevealed: false }))
  );
};

const dirX = [0, 0, 1, -1, 1, -1, -1, 1];
const dirY = [1, -1, 0, 0, 1, -1, 1, -1];

const plandMines = (
  board: CellData[][],
  mines: number,
  sx: number,
  sy: number
) => {
  const rows = board.length;
  const cols = board[0].length;

  while (mines) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);

    if (x === sx && y === sy) continue;
    if (board[x][y].element === -1) continue;

    board[x][y].element = -1;
    for (let i = 0; i < 8; i++) {
      const nx = x + dirX[i];
      const ny = y + dirY[i];
      if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
      if (board[ny][nx].element === -1) continue;
      board[ny][nx].element++;
    }
    mines--;
  }
};

const dfs = (board: CellData[][], x: number, y: number) => {
  const rows = board.length;
  const cols = board[0].length;

  if (x < 0 || x >= cols || y < 0 || y >= rows) return;
  if (board[y][x].isRevealed) return;
  if (board[y][x].element === -1) return;
  board[y][x].isRevealed = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dirX[i];
    const ny = y + dirY[i];
    dfs(board, nx, ny);
  }
};

const initialState: GameState = {
  difficulty: Difficulty.Intermediate,
  board: initBoard(
    difficultySettings[Difficulty.Intermediate].rows,
    difficultySettings[Difficulty.Intermediate].cols
  ),
  plantedMines: difficultySettings[Difficulty.Intermediate].mines,
  remainingMines: difficultySettings[Difficulty.Intermediate].mines,
  time: 0,
  isPlaying: false,
  exploded: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<Difficulty>) {
      const selectedDifficulty = action.payload;
      state.difficulty = selectedDifficulty;
      state.board = initBoard(
        difficultySettings[selectedDifficulty].rows,
        difficultySettings[selectedDifficulty].cols
      );
      state.plantedMines = difficultySettings[selectedDifficulty].mines;
      state.remainingMines = difficultySettings[selectedDifficulty].mines;
    },
    sweepElement(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;

      if (state.isPlaying === false) {
        plandMines(
          state.board,
          difficultySettings[state.difficulty].mines,
          row,
          col
        );
        state.isPlaying = true;
        state.board[row][col].isRevealed = true;
        dfs(state.board, row, col);
      } else {
        if (state.board[row][col].element === -1) {
          state.board[row][col].isRevealed = true;
          state.board[row][col].element = -2;
          state.isPlaying = false;
          state.exploded = true;
        } else {
          dfs(state.board, row, col);
        }
      }
    },
    resetGame(state) {
      state.board = initBoard(
        difficultySettings[state.difficulty].rows,
        difficultySettings[state.difficulty].cols
      );
      state.plantedMines = difficultySettings[state.difficulty].mines;
      state.remainingMines = difficultySettings[state.difficulty].mines;
      state.isPlaying = false;
      state.exploded = false;
    },
  },
});

export const { setDifficulty, sweepElement, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
