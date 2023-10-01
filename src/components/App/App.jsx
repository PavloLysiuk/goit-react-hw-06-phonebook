import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Container, NoContacts } from './App.styled';
import { GlobalStyle } from 'GlobalStyles';

export function App() {
  const contacts = useSelector(getContacts);

  return (
    <Container>
      <ContactForm title="Phonebook" />
      {contacts.length > 0 ? (
        <ContactList />
      ) : (
        <NoContacts>No contacts in phone book</NoContacts>
      )}
      <GlobalStyle />
    </Container>
  );
}
