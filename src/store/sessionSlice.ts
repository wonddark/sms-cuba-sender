import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  logged: boolean;
  token: string;
  tokenRefresh: string;
  tokenRefreshExpiration: number;
}
const initialState: SessionState = {
  logged: false,
  token: "",
  tokenRefresh: "",
  tokenRefreshExpiration: 0,
};
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<SessionState>) => {
      state.logged = true;
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
      state.tokenRefreshExpiration = action.payload.tokenRefreshExpiration;
    },
    logout: (state) => {
      state.token = "";
      state.tokenRefresh = "";
      state.logged = false;
      state.tokenRefreshExpiration = 0;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
