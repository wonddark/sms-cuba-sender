import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
