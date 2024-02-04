import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import difficultyReducer from 'src/store/difficultySlice';
import gameReducer from 'src/store/gameSlice';
import recordReducer from 'src/store/recordSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  record: recordReducer,
  difficulty: difficultyReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['difficulty'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
