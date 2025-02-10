import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TimerState {
  currentTime: number; // Поточний час в секундах
  maxTime: number; // Максимальний час в секундах
  isOver: boolean; // Чи закінчився час
  isRunning: boolean; // Чи запущений таймер
}

const initialState: TimerState = {
  currentTime: 0,
  maxTime: 0,
  isOver: false,
  isRunning: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // Встановлення максимального часу
    setMaxTime: (state, action: PayloadAction<number>) => {
      state.maxTime = action.payload;
      state.currentTime = action.payload;
      state.isOver = false;
    },
    // Зменшення поточного часу на 1 секунду
    tick: (state) => {
      if (state.currentTime > 0) {
        state.currentTime -= 1;
      }
      if (state.currentTime === 0) {
        state.isOver = true;
        state.isRunning = false;
      }
    },
    // Запуск таймера
    startTimer: (state) => {
      state.isRunning = true;
    },
    // Пауза таймера
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    // Скидання таймера
    resetTimer: (state) => {
      state.currentTime = state.maxTime;
      state.isOver = false;
      state.isRunning = false;
    },
  },
});

// Селектори
export const selectTimer = (state: RootState) => state.timer;
export const selectIsTimerOver = (state: RootState) => state.timer.isOver;
export const selectCurrentTime = (state: RootState) => state.timer.currentTime;
export const selectIsTimerRunning = (state: RootState) => state.timer.isRunning;

export const { setMaxTime, tick, startTimer, pauseTimer, resetTimer } =
  timerSlice.actions;
export default timerSlice.reducer;
