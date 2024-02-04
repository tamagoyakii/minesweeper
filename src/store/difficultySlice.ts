import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Difficulty } from 'src/types/gameTypes';

export const difficultySets = {
  [Difficulty.Beginner]: { width: 8, height: 8, bombs: 10 },
  [Difficulty.Intermediate]: { width: 16, height: 16, bombs: 40 },
  [Difficulty.Expert]: { width: 32, height: 16, bombs: 100 },
  [Difficulty.Custom]: { width: 0, height: 0, bombs: 0 },
};

interface DifficultyState {
  currentDifficulty: Difficulty;
  width: number;
  height: number;
  bombs: number;
}

const initialState: DifficultyState = {
  currentDifficulty: Difficulty.Intermediate,
  width: difficultySets[Difficulty.Intermediate].width,
  height: difficultySets[Difficulty.Intermediate].height,
  bombs: difficultySets[Difficulty.Intermediate].bombs,
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    setDifficulty(
      state,
      action: PayloadAction<{
        difficulty: Difficulty;
        width?: number;
        height?: number;
        bombs?: number;
      }>
    ) {
      const { difficulty, width, height, bombs } = action.payload;

      state.currentDifficulty = difficulty;
      if (difficulty === Difficulty.Custom) {
        state.width = width ?? 0;
        state.height = height ?? 0;
        state.bombs = bombs ?? 0;
      } else {
        state.width = difficultySets[difficulty].width;
        state.height = difficultySets[difficulty].height;
        state.bombs = difficultySets[difficulty].bombs;
      }
    },
  },
});

export const { setDifficulty } = difficultySlice.actions;
export default difficultySlice.reducer;
