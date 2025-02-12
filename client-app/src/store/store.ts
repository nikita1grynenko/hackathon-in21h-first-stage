import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice';
import paginationReducer from './slices/pagination.slice';
import timerReducer from './slices/timer.slice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    auth: authReducer,
    pagination: paginationReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
