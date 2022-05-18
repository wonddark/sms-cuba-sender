import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import pageReducer from "./pageSlice";
import contactsReducer from "./contactsSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    page: pageReducer,
    contacts: contactsReducer,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
