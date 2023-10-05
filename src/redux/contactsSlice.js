import { createSlice, nanoid } from '@reduxjs/toolkit';
import prevContacts from '../data/prevContacts';
import toast from 'react-hot-toast';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsList: prevContacts,
  },
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        state.contactsList.push(payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, { payload }) {
      const deletedContact = state.contactsList.find(
        contact => contact.id === payload
      );
      if (deletedContact) {
        state.contactsList = state.contactsList.filter(
          contact => contact.id !== payload
        );
        toast.success(`${deletedContact.name} is successfully deleted`, {
          style: {
            color: 'white',
            background: '#ff8e31',
          },
        });
      }
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
