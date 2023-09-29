import React, { useState, useEffect } from 'react';
import { GlobalStyle } from 'GlobalStyles';
import { Container, NoContacts } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import prevContacts from '../../data/prevContacts';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const initialContacts = localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : prevContacts;

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isAlreadyExist = contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isAlreadyExist) {
      toast.error(`${newContact.name} is already in contacts`, {
        style: {
          background: '#ffd500',
        },
      });
      return;
    }

    toast.success(`${newContact.name} is added to contacts`, {
      style: {
        color: 'white',
        background: '#5cc400',
      },
    });

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);
  };

  const filterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };

  const handleDeleteContact = id => {
    const deletedContact = contacts.find(contact => contact.id === id);
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );

    toast.success(`${deletedContact.name} is deleted from contacts`, {
      style: {
        color: 'white',
        background: '#ff8e31',
      },
    });
  };

  return (
    <Container>
      <ContactForm title="Phonebook" onAdd={addContact} />
      {contacts.length > 0 ? (
        <ContactList
          title="Contacts"
          getContacts={filterContact()}
          onFilter={handleFilterChange}
          onDelete={handleDeleteContact}
        />
      ) : (
        <NoContacts>No contacts in phone book</NoContacts>
      )}
      <GlobalStyle />
      <Toaster
        gutter={4}
        containerStyle={{
          top: 53,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            width: '360px',
            padding: '16px',
          },
        }}
      />
    </Container>
  );
}
