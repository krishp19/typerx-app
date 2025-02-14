import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to send stats to the API
export const sendStatsToAPI = createAsyncThunk(
  "typing/sendStatsToAPI",
  async ({ userId, wpm, accuracy, sessionDate }) => {
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, wpm, accuracy, sessionDate }),
      });

      const data = await response.json();
      console.log("✅ Stats updated in backend:", data);
      return data;
    } catch (error) {
      console.error("❌ Error sending stats:", error);
      throw error;
    }
  }
);

const typingSlice = createSlice({
  name: "typing",
  initialState: {
    averageWpm: 0,
    averageAccuracy: 100,
    totalSessions: 0,
    sessionHistory: [],
  },
  reducers: {
    updateStats: (state, action) => {
      state.averageWpm = action.payload.averageWpm;
      state.averageAccuracy = action.payload.averageAccuracy;
      state.totalSessions = action.payload.totalSessions;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendStatsToAPI.fulfilled, (state, action) => {
      // Update Redux state after a successful API call
      state.averageWpm = action.payload.averageWpm;
      state.averageAccuracy = action.payload.averageAccuracy;
      state.totalSessions = action.payload.totalSessions;
      state.sessionHistory = action.payload.sessionHistory;
    });
  },
});

export const { updateStats } = typingSlice.actions;
export default typingSlice.reducer;
