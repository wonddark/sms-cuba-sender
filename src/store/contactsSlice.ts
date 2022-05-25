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

type ContactsState = {
  data: ContactsData;
  selected: { id: string; name: string; phone: string }[];
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
    addToSelected: (
      state,
      action: PayloadAction<{ id: string; name: string; phone: string }>
    ) => {
      state.selected.push(action.payload);
      return state;
    },
    removeFromSelected: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter(
        (item) => item.id !== action.payload
      );
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        state.data = payload as unknown as ContactsData;
        return state;
      }
    );
  },
});

export const { addToSelected, removeFromSelected } = contactsSlice.actions;
export default contactsSlice.reducer;
