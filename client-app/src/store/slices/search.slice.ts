import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectUserId = (state: RootState) =>
  state.auth.user?.id;

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
