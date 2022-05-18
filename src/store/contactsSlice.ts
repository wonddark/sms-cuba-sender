import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ContactInfo = {
  id: number;
  name: string;
  phone: string;
};
export type ContactsState = ContactInfo[];
const initialState: ContactsState = [];
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactInfo>) => {
      state.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<ContactInfo>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      index !== -1 && (state[index] = action.payload);
    },
    removeContact: (state, action: PayloadAction<ContactInfo>) => {
      state = state.filter((item) => item.id !== action.payload.id);
      return state;
    },
  },
});

export const { addContact, updateContact, removeContact } =
  contactsSlice.actions;
export default contactsSlice.reducer;
