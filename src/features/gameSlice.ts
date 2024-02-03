import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { dfs, initBoard, plantBombs } from 'src/services/game';
import { Difficulty, GameState } from 'src/types/gameTypes';

export const difficultySettings = {
  [Difficulty.Beginner]: { rows: 8, cols: 8, mines: 10 },
  [Difficulty.Intermediate]: { rows: 16, cols: 16, mines: 40 },
  [Difficulty.Expert]: { rows: 16, cols: 32, mines: 100 },
  [Difficulty.Custom]: { rows: 0, cols: 0, mines: 0 },
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
    sweepMine(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;

      if (state.isPlaying === false) {
        plantBombs(
          state.board,
          difficultySettings[state.difficulty].mines,
          row,
          col
        );
        state.isPlaying = true;
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

export const { setDifficulty, sweepMine, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
