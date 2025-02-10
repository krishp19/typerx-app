"use client"

import { configureStore } from "@reduxjs/toolkit";
import typingReducer from "./features/typingSlice";

export const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});
