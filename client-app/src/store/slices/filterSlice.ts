import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DifficultyLevel = 'all' | 'easy' | 'medium' | 'hard';

interface FilterState {
  difficulty: DifficultyLevel;
}

const initialState: FilterState = {
  difficulty: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<DifficultyLevel>) => {
      state.difficulty = action.payload;
    },
  },
});

// Добавляем селектор
export const selectDifficulty = (state: { filter: FilterState }) =>
  state.filter.difficulty;

export const { setDifficulty } = filterSlice.actions;
export default filterSlice.reducer;
