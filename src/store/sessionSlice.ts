import { createSlice } from "@reduxjs/toolkit";
import api from "./services/api";

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
    logout: (state) => {
      state.token = "";
      state.tokenRefresh = "";
      state.logged = false;
      state.tokenRefreshExpiration = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.tokenRefresh = payload.refresh_token;
        state.tokenRefreshExpiration = payload.refresh_token_expiration;
        state.logged = true;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state, { payload }) => {
        console.log("PAYLOAD", payload);
      });
  },
});

export const { logout } = sessionSlice.actions;
export default sessionSlice.reducer;
