import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import authReducer from "./slice/auth/authSlice";

// the configureStore function accepts an object that has a reducer key
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
