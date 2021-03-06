import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "./services/api";

type ContactsData = {
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

export type SimpleContact = { id: string; name: string; phone: string };

type ContactsState = {
  data: ContactsData;
  selected: SimpleContact[];
};

const initialState: ContactsState = {
  data: {
    "@context": "",
    "@id": "",
    "@type": "",
    "hydra:member": [],
    "hydra:totalItems": 0,
    "hydra:view": { "@id": "", "@type": "" },
  },
  selected: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addToSelected: (state, action: PayloadAction<SimpleContact>) => {
      state.selected.every((item) => item.id !== action.payload.id) &&
        state.selected.push(action.payload);
    },
    removeFromSelected: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getContacts.matchFulfilled,
        (state, { payload }) => {
          state.data = payload as unknown as ContactsData;
        }
      )
      .addMatcher(
        api.endpoints.editContact.matchFulfilled,
        (state, { payload }) => {
          state.selected = state.selected.map((item) => {
            if (item.id === payload["@id"]) {
              return { ...item, name: payload.name, phone: payload.phone };
            }
            return item;
          });
        }
      );
  },
});

export const { addToSelected, removeFromSelected } = contactsSlice.actions;
export default contactsSlice.reducer;
