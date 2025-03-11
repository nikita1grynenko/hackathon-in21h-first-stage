import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttemptResult } from "../../models/quest-attempt.model";

interface AttemptsResultsState {
  attemptStack: Record<string, AttemptResult>;
}

const initialState: AttemptsResultsState = {
  attemptStack: {},
};

const attemptSlice = createSlice({
  name: 'attempts',
  initialState,
  reducers: {
    addAttemptToStack: (state, action: PayloadAction<[string, AttemptResult]>) => {
      state.attemptStack[action.payload[0]] = action.payload[1];
    },
    setAttempts: (state, action: PayloadAction<Record<string, AttemptResult>>) => {
      state.attemptStack = action.payload;
    },
    clearAttempts: (state) => {
      state.attemptStack = {};
    },
  },
});

export const selectAttemptStack = (state: AttemptsResultsState) => state.attemptStack;

export const { addAttemptToStack, setAttempts } = attemptSlice.actions;

export default attemptSlice.reducer;
