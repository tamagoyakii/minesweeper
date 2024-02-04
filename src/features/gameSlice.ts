import { Height } from '@mui/icons-material';
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
  remainingMines:
    difficultySettings[Difficulty.Intermediate].width *
      difficultySettings[Difficulty.Intermediate].height -
    difficultySettings[Difficulty.Intermediate].bombs,
  width: difficultySettings[Difficulty.Intermediate].width,
  height: difficultySettings[Difficulty.Intermediate].height,
  isPlaying: false,
  exploded: false,
  succeded: false,
  clicks: 0,
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
      state.remainingMines = width * height - state.plantedBombs;
      state.width = width;
      state.height = height;
      state.isPlaying = false;
      state.succeded = false;
      state.clicks = 0;
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
      state.remainingMines = width * height - bombs;
      state.width = width;
      state.height = height;
      state.isPlaying = false;
      state.succeded = false;
      state.clicks = 0;
    },
    sweepMine(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;

      if (state.isPlaying === false) {
        plantBombs(state.board, state.plantedBombs, row, col);
        state.isPlaying = true;
        state.remainingMines -= dfs(state.board, row, col);
      } else {
        if (state.board[row][col].element === -1) {
          state.board[row][col].isRevealed = true;
          state.board[row][col].element = -2;
          state.exploded = true;
          state.board.forEach((row) => {
            row.forEach((el) => {
              if (el.flagType === 'bombflagged' && el.element !== -1) {
                el.element = -3;
              }
              if (el.element < 0) {
                el.isRevealed = true;
              }
            });
          });
        } else {
          state.remainingMines -= dfs(state.board, row, col);
        }
      }
      state.clicks++;
      if (state.remainingMines === 0) {
        state.succeded = true;
      }
    },
    resetGame(state) {
      state.board = initBoard(state.width, state.height);
      state.remainingBombs = state.plantedBombs;
      state.remainingMines = state.width * state.height - state.plantedBombs;
      state.isPlaying = false;
      state.exploded = false;
      state.succeded = false;
      state.clicks = 0;
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
      if (state.remainingBombs === 0) {
        const isSucceded = state.board.every((row) =>
          row.every((el) => {
            if (el.element === -1) {
              return el.flagType === 'bombflagged';
            }
            return el.isRevealed;
          })
        );
        if (isSucceded) {
          state.succeded = true;
        }
      }
    },
  },
});

export const { setDifficulty, setCustom, sweepMine, resetGame, checkFlag } =
  gameSlice.actions;
export default gameSlice.reducer;
