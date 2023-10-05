import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { formatContactNumber } from 'utils/formatContactNumber';
import { Filter } from 'components/Filter/Filter';
import {
  Title,
  ListItem,
  Text,
  DeleteButton,
  NoContacts,
} from './ContactList.styled';
import { PiTrash } from 'react-icons/pi';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contactsList);

  const filter = useSelector(state => state.filter.value);

  const getContacts = () => {
    let normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      {contacts.length > 0 ? (
        <>
          <Title>Contacts</Title>
          <Filter />
          <ul>
            {getContacts().map(contact => {
              return (
                <ListItem key={contact.id}>
                  <Text>
                    {contact.name}: {formatContactNumber(contact.number)}
                  </Text>
                  <DeleteButton
                    type="button"
                    onClick={() => dispatch(deleteContact(contact.id))}
                  >
                    <PiTrash />
                  </DeleteButton>
                </ListItem>
              );
            })}
          </ul>
        </>
      ) : (
        <NoContacts>No contacts in phone book</NoContacts>
      )}
    </>
  );
};
