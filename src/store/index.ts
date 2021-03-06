import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import pageReducer from "./pageSlice";
import contactsReducer from "./contactsSlice";
import api from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const STORAGE_KEY = "sms-cuba-sender";

const saveState = (state: ReturnType<typeof store.getState>) => {
  try {
    const stateFilter = JSON.parse(JSON.stringify(state));
    stateFilter.contacts.selected = [];
    stateFilter.page.current = "HOME";
    delete stateFilter.api;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateFilter));
  } catch (e) {}
};

const persistedState = (() => {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (rawState === null) return undefined;
    return JSON.parse(rawState);
  } catch (e) {
    return undefined;
  }
})();

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: api.endpoints.addContact.matchFulfilled,
  effect: (action, listenerApi) => {
    /*listenerApi.dispatch(
      api.endpoints.getContacts.initiate(
        { page: 1, itemsPerPage: 50 },
        { forceRefetch: true }
      )
    );*/
  },
});

const store = configureStore({
  reducer: {
    session: sessionReducer,
    page: pageReducer,
    contacts: contactsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(api.middleware),
  preloadedState: persistedState,
});

setupListeners(store.dispatch);
store.subscribe(() => saveState(store.getState()));

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
