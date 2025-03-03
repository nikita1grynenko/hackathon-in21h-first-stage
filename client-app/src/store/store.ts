import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filter.slice';
import searchReducer from './slices/search.slice';
import authReducer from './slices/auth.slice';
import paginationReducer from './slices/pagination.slice';
import timerReducer from './slices/timer.slice';
import attemptReducer from './slices/attempt.slice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    auth: authReducer,
    pagination: paginationReducer,
    timer: timerReducer,
    attempts: attemptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
