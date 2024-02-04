import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { dfs, initBoard, plantBombs } from 'src/services/game';
import { Difficulty, GameState } from 'src/types/gameTypes';

export const difficultySettings = {
  [Difficulty.Beginner]: { width: 8, height: 8, bombs: 10 },
  [Difficulty.Intermediate]: { width: 16, height: 16, bombs: 40 },
  [Difficulty.Expert]: { width: 32, height: 16, bombs: 100 },
  [Difficulty.Custom]: { width: 0, height: 0, bombs: 0 },
};

const initialState: GameState = {
  difficulty: Difficulty.Intermediate,
  board: initBoard(
    difficultySettings[Difficulty.Intermediate].width,
    difficultySettings[Difficulty.Intermediate].height
  ),
  plantedBombs: difficultySettings[Difficulty.Intermediate].bombs,
  remainingBombs: difficultySettings[Difficulty.Intermediate].bombs,
  width: difficultySettings[Difficulty.Intermediate].width,
  height: difficultySettings[Difficulty.Intermediate].height,
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
      const width = difficultySettings[selectedDifficulty].width;
      const height = difficultySettings[selectedDifficulty].height;

      state.difficulty = selectedDifficulty;
      state.board = initBoard(width, height);
      state.plantedBombs = difficultySettings[selectedDifficulty].bombs;
      state.remainingBombs = difficultySettings[selectedDifficulty].bombs;
      state.width = width;
      state.height = height;
      state.isPlaying = false;
    },
    setCustom(
      state,
      action: PayloadAction<{ width: number; height: number; bombs: number }>
    ) {
      const { width, height, bombs } = action.payload;

      state.difficulty = Difficulty.Custom;
      state.board = initBoard(width, height);
      state.plantedBombs = bombs;
      state.remainingBombs = bombs;
      state.width = width;
      state.height = height;
      state.isPlaying = false;
    },
    sweepMine(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;

      if (state.isPlaying === false) {
        plantBombs(state.board, state.plantedBombs, row, col);
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
      state.board = initBoard(state.width, state.height);
      state.remainingBombs = state.plantedBombs;
      state.isPlaying = false;
      state.exploded = false;
    },
    checkFlag(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;

      if (state.board[row][col].flagType === 'blank') {
        state.board[row][col].flagType = 'bombflagged';
        state.remainingBombs--;
      } else if (state.board[row][col].flagType === 'bombflagged') {
        state.board[row][col].flagType = 'bombquestion';
        state.remainingBombs++;
      } else {
        state.board[row][col].flagType = 'blank';
      }
    },
  },
});

export const { setDifficulty, setCustom, sweepMine, resetGame, checkFlag } =
  gameSlice.actions;
export default gameSlice.reducer;
