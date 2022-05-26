import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Pages = "HOME" | "LOGIN" | "REGISTER" | "CONTACTS" | "SEND";
export type PageState = {
  current: Pages;
};

const initialState: PageState = {
  current: "LOGIN",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<Pages>) => {
      state.current = action.payload;
    },
  },
});

export const { changePage } = pageSlice.actions;

export default pageSlice.reducer;
