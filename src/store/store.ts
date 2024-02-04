import { combineReducers, configureStore } from '@reduxjs/toolkit';

import gameReducer from 'src/store/gameSlice';
import recordReducer from 'src/store/recordSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  record: recordReducer,
});

const persistConfig = {
  key: 'root',
  localStorage,
  whitelist: ['record'],
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
