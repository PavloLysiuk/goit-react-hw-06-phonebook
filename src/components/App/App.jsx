import { GlobalStyle } from 'GlobalStyles';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Toaster } from 'react-hot-toast';

export function App() {
  return (
    <Container>
      <ContactForm />
      <ContactList />
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
