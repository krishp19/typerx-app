// features/typingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  averageWpm: 0,
  averageAccuracy: 100,
  sessions: 0,
  totalWpm: 0,
  totalAccuracy: 0,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    updateStats: (state, action) => {
      const { wpm, accuracy } = action.payload;
      state.totalWpm += wpm;
      state.totalAccuracy += accuracy;
      state.sessions += 1;
      state.averageWpm = Math.floor(state.totalWpm / state.sessions);
      state.averageAccuracy = Math.floor(state.totalAccuracy / state.sessions);
    },
    resetStats: (state) => {
      state.averageWpm = 0;
      state.averageAccuracy = 100;
      state.sessions = 0;
      state.totalWpm = 0;
      state.totalAccuracy = 0;
    },
  },
});

export const { updateStats, resetStats } = typingSlice.actions;
export default typingSlice.reducer;
