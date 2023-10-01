import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const prevContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-5', name: 'Pavlo Lysiuk', number: '222-42-62' },
];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: prevContacts },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            contactName: name,
            number: number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const deletedContact = {
        contacts: state.contacts.filter(cont => cont.id !== action.payload),
      };
      return deletedContact;
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
