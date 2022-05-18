import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
};
interface SessionState {
  user: User | undefined;
  logged: boolean;
  token: string;
  tokenRefresh: string;
}
const initialState: SessionState = {
  user: undefined,
  logged: false,
  token: "",
  tokenRefresh: "",
};
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<SessionState>) => {
      state.user = action.payload.user;
      state.logged = true;
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
    },
    logout: (state) => {
      state.user = undefined;
      state.token = "";
      state.tokenRefresh = "";
      state.logged = false;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
