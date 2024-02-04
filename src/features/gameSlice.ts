import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  dfs,
  initBoard,
  openAdjacentArea,
  plantBombs,
  resetGameState,
  openBombs,
} from 'src/services/game';
import { Difficulty, GameState } from 'src/types/gameTypes';

export const difficultySets = {
  [Difficulty.Beginner]: { width: 8, height: 8, bombs: 10 },
  [Difficulty.Intermediate]: { width: 16, height: 16, bombs: 40 },
  [Difficulty.Expert]: { width: 32, height: 16, bombs: 100 },
  [Difficulty.Custom]: { width: 0, height: 0, bombs: 0 },
};

const initialState: GameState = {
  difficulty: Difficulty.Intermediate,
  board: initBoard(
    difficultySets[Difficulty.Intermediate].width,
    difficultySets[Difficulty.Intermediate].height
  ),
  plantedBombs: difficultySets[Difficulty.Intermediate].bombs,
  remainingBombs: difficultySets[Difficulty.Intermediate].bombs,
  remainingMines:
    difficultySets[Difficulty.Intermediate].width *
    difficultySets[Difficulty.Intermediate].height,
  width: difficultySets[Difficulty.Intermediate].width,
  height: difficultySets[Difficulty.Intermediate].height,
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

      state.difficulty = selectedDifficulty;
      state.width = difficultySets[selectedDifficulty].width;
      state.height = difficultySets[selectedDifficulty].height;
      state.plantedBombs = difficultySets[selectedDifficulty].bombs;
      resetGameState(state);
    },
    setCustomGame(
      state,
      action: PayloadAction<{ width: number; height: number; bombs: number }>
    ) {
      const { width, height, bombs } = action.payload;

      state.difficulty = Difficulty.Custom;
      state.width = width;
      state.height = height;
      state.plantedBombs = bombs;
      resetGameState(state);
    },
    resetGame(state) {
      resetGameState(state);
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
          openBombs(state.board);
        } else {
          state.remainingMines -= dfs(state.board, row, col);
        }
      }
      state.clicks++;
      if (state.remainingMines === state.plantedBombs) {
        state.succeded = true;
      }
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
    openArea(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      const res = openAdjacentArea(state.board, row, col);

      if (res === -1) {
        state.exploded = true;
        openAdjacentArea(state.board, row, col);
        openBombs(state.board);
      } else {
        state.clicks++;
        state.remainingMines -= res;
      }
    },
  },
});

export const {
  setDifficulty,
  setCustomGame,
  sweepMine,
  resetGame,
  checkFlag,
  openArea,
} = gameSlice.actions;
export default gameSlice.reducer;
