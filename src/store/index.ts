import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import pageReducer from "./pageSlice";
import contactsReducer from "./contactsSlice";
import api from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    page: pageReducer,
    contacts: contactsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
