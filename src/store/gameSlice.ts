import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  dfs,
  initBoard,
  openAdjacentArea,
  plantBombs,
  resetGameState,
  openBombs,
} from 'src/services/game';
import { difficultySets } from 'src/store/difficultySlice';
import { Difficulty, GameState } from 'src/types/gameTypes';

const initialState: GameState = {
  board: initBoard(
    difficultySets[Difficulty.Intermediate].width,
    difficultySets[Difficulty.Intermediate].height
  ),
  plantedBombs: difficultySets[Difficulty.Intermediate].bombs,
  remainingBombs: difficultySets[Difficulty.Intermediate].bombs,
  remainingMines:
    difficultySets[Difficulty.Intermediate].width *
    difficultySets[Difficulty.Intermediate].height,
  isPlaying: false,
  exploded: false,
  succeded: false,
  clicks: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame(
      state,
      action: PayloadAction<{ width: number; height: number; bombs: number }>
    ) {
      const { width, height } = action.payload;
      state.board = initBoard(width, height);
      state.plantedBombs = action.payload.bombs;
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
      if (state.remainingMines === state.plantedBombs) {
        state.succeded = true;
      }
    },
  },
});

export const { setGame, resetGame, sweepMine, checkFlag, openArea } =
  gameSlice.actions;
export default gameSlice.reducer;
