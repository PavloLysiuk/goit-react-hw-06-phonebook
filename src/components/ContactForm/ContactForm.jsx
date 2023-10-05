import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { Title, FormInput, AddButton, ErrorMsg } from './ContactForm.styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Name must have at least 3 characters')
      .required('Name is required')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Name is allowed to include only letters, apostrophes, dashes, and spaces'
      ),
    number: yup
      .string()
      .min(7, 'Phone number should be a minimum of 7 characters')
      .max(17, 'Phone number must not exceed 17 characters in length.')
      .required('Number is required')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must consist of digits and may include spaces, dashes, parentheses, and can begin with a plus sign (+)'
      ),
  })
  .required();

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contactsList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts`, {
        style: {
          background: '#ffd500',
        },
      });
      reset();
      return;
    }
    toast.success(`${name} is added to contacts`, {
      style: {
        color: 'white',
        background: '#5cc400',
      },
    });
    dispatch(addContact(name, number));
    reset();
  };

  return (
    <>
      <Title>Phone Book</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          {...register('name')}
          placeholder="Full Name (Example: Pavlo Lysiuk)"
        />
        {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}

        <FormInput
          type="tel"
          {...register('number')}
          placeholder="Phone number (Example: XXXXXXX)"
        />
        {errors.number && <ErrorMsg>{errors.number.message}</ErrorMsg>}

        <AddButton type="submit">Add contact</AddButton>
      </form>
    </>
  );
};
