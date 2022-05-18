import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import pageReducer from "./pageSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    page: pageReducer,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
