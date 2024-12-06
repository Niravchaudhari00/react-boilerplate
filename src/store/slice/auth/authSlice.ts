import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../type/auth-type";
import { getSessionStorage, setSessionStorage } from "../../../utils/storageService";

const initialState: AuthState = {
  isToken: getSessionStorage("token") || null,
  userRole: "admin",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.isToken = token;
      setSessionStorage("token", token);
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
