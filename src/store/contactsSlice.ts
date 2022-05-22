import { createSlice } from "@reduxjs/toolkit";
import api from "./services/api";

type ContactsState = {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": {
    "@id": string;
    "@type": string;
    id: number;
    name: string;
    phone: string;
    user: string;
    messages: string[];
  }[];
  "hydra:totalItems": number;
  "hydra:view": {
    "@id": string;
    "@type": string;
  };
};

const initialState: ContactsState = {
  "@context": "",
  "@id": "",
  "@type": "",
  "hydra:member": [],
  "hydra:totalItems": 0,
  "hydra:view": { "@id": "", "@type": "" },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        state = payload as unknown as ContactsState;
        return state;
      }
    );
  },
});

export default contactsSlice.reducer;
