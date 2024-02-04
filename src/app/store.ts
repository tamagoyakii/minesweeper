import { configureStore } from '@reduxjs/toolkit';

import gameReducer from 'src/features/gameSlice';
import recordReducer from 'src/features/recordSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    record: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
