import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getVisibleContacts } from 'redux/selectors';
import { FormInput, ErrorMsg, AddButton } from './ContactForm.styled';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const SubmitSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name Is Too Short!')
    .max(30, 'Name Is Too Long!')
    .required('Required'),
  number: Yup.number()
    .min(3, 'Number Is Too Short!')
    .max(9999999, 'Number Is Too Long!')
    .positive('Must be positive')
    .required('Required'),
});

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const isAlreadyExist = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLocaleLowerCase().trim()
    );
    if (isAlreadyExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ name: '', number: '' }}
      validationSchema={SubmitSchema}
    >
      <Form>
        <FormInput
          type="text"
          name="name"
          placeholder="Full Name (Example: Pavlo Lysiuk)"
        />
        <ErrorMsg name="name" component="p" />
        <FormInput
          onChange={handleChange}
          type="tel"
          name="number"
          placeholder="Phone number (Example: XXXXXXX)"
        />
        <ErrorMsg name="number" component="p" />
        <AddButton type="submit">Add contact</AddButton>
      </Form>
    </Formik>
  );
};
