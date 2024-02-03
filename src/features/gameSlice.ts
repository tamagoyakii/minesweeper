import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
  Custom = 'Custom',
}

export const difficultySettings = {
  [Difficulty.Beginner]: { rows: 8, columns: 8, mines: 10 },
  [Difficulty.Intermediate]: { rows: 16, columns: 16, mines: 40 },
  [Difficulty.Expert]: { rows: 16, columns: 32, mines: 100 },
  [Difficulty.Custom]: { rows: 0, columns: 0, mines: 0 },
};

interface GameState {
  difficulty: Difficulty;
  board: number[][];
  plantedMines: number;
  remainingMines: number;
  time: number;
  firstClick: boolean;
}

const initialState: GameState = {
  difficulty: Difficulty.Intermediate,
  board: Array.from(
    { length: difficultySettings[Difficulty.Intermediate].rows },
    () => Array(difficultySettings[Difficulty.Intermediate].columns).fill(0)
  ),
  plantedMines: difficultySettings[Difficulty.Intermediate].mines,
  remainingMines: difficultySettings[Difficulty.Intermediate].mines,
  time: 0,
  firstClick: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<Difficulty>) {
      const selectedDifficulty = action.payload;
      state.difficulty = selectedDifficulty;
      state.board = Array.from(
        { length: difficultySettings[selectedDifficulty].rows },
        () => Array(difficultySettings[selectedDifficulty].columns).fill(0)
      );
      state.plantedMines = difficultySettings[selectedDifficulty].mines;
      state.remainingMines = difficultySettings[selectedDifficulty].mines;
    },
    setBoard(state, action: PayloadAction<{ sx: number; sy: number }>) {
      const { sx, sy } = action.payload;
      const rows = difficultySettings[state.difficulty].rows;
      const cols = difficultySettings[state.difficulty].columns;
      const dirX = [0, 0, 1, -1, 1, -1, -1, 1];
      const dirY = [1, -1, 0, 0, 1, -1, 1, -1];
      let mines = difficultySettings[state.difficulty].mines;

      while (mines) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);

        if (x === sx && y === sy) continue;
        if (state.board[x][y] === -1) continue;

        state.board[x][y] = -1;
        for (let i = 0; i < 8; i++) {
          const nx = x + dirX[i];
          const ny = y + dirY[i];
          if (nx >= 0 || nx < cols || ny >= 0 || ny < rows) continue;
          if (state.board[ny][nx] === -1) continue;
          state.board[ny][nx]++;
        }
        mines--;
      }
    },
  },
});

export const { setDifficulty, setBoard } = gameSlice.actions;
export default gameSlice.reducer;
