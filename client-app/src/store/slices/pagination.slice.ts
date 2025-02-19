import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  maxPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 12, // Кількість квестів на сторінці
  totalItems: 0,
  maxPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    // Встановлення поточної сторінки
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Встановлення загальної кількості елементів
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
      state.maxPage = Math.ceil(state.totalItems / state.itemsPerPage);
    },
    // Зміна кількості елементів на сторінці
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      // Якщо поточна сторінка стала недійсною після зміни
      const maxPage = Math.ceil(state.totalItems / action.payload);
      if (state.currentPage > maxPage) {
        state.currentPage = maxPage;
      }
    },
  },
});

// Селектори
export const selectPagination = (state: RootState) => state.pagination;
export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;
export const selectItemsPerPage = (state: RootState) =>
  state.pagination.itemsPerPage;
export const selectTotalPages = (state: RootState) =>
  Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
export const selectTotalItems = (state: RootState) =>
  state.pagination.totalItems;

export const { setCurrentPage, setTotalItems, setItemsPerPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
