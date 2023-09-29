import { Filter } from 'components/Filter/Filter';
import { Title, ListItem, Text, DeleteButton } from './ContactList.styled';
import { PiTrash } from 'react-icons/pi';

export const ContactList = ({ title, getContacts, onFilter, onDelete }) => {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <Filter onFilter={onFilter} />

      <ul>
        {getContacts.map(contact => (
          <ListItem key={contact.id}>
            <Text>
              {contact.name}: {contact.number}
            </Text>
            <DeleteButton type="button" onClick={() => onDelete(contact.id)}>
              <PiTrash />
            </DeleteButton>
          </ListItem>
        ))}
      </ul>
    </div>
  );
};
