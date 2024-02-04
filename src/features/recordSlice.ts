import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Difficulty } from 'src/types/gameTypes';

interface Records {
  recentRecord: number;
  bestRecord: number;
}

interface RecordState {
  [Difficulty.Beginner]: Records;
  [Difficulty.Intermediate]: Records;
  [Difficulty.Expert]: Records;
  [Difficulty.Custom]: Records;
}

const initialState: RecordState = {
  [Difficulty.Beginner]: { recentRecord: 999, bestRecord: 999 },
  [Difficulty.Intermediate]: { recentRecord: 999, bestRecord: 999 },
  [Difficulty.Expert]: { recentRecord: 999, bestRecord: 999 },
  [Difficulty.Custom]: { recentRecord: 999, bestRecord: 999 },
};

export const recordSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRecord(
      state,
      action: PayloadAction<{ difficulty: Difficulty; record: number }>
    ) {
      const { difficulty, record } = action.payload;

      state[difficulty].recentRecord = record;
      if (record < state[difficulty].bestRecord) {
        state[difficulty].bestRecord = record;
      }
    },
  },
});

export const { setRecord } = recordSlice.actions;
export default recordSlice.reducer;
