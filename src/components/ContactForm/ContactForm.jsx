import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

import { Title, FormInput, AddButton } from './ContactForm.styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contactsList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(SubmitSchema),
  });

  const onSubmit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContact(name, number));
    reset();
  };

  return (
    <div>
      <Title>Phone Book</Title>

      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={SubmitSchema}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form>
          <FormInput
            type="text"
            {...register('name')}
            placeholder="Full Name (Example: Pavlo Lysiuk)"
          />
          {errors.name && <p>{errors.name.message}</p>}
          <FormInput
            type="tel"
            {...register('name')}
            placeholder="Phone number (Example: XXXXXXX)"
          />
          {errors.number && <p>{errors.number.message}</p>}
          <AddButton type="submit">Add contact</AddButton>
        </Form>
      </Formik>
    </div>
  );
};
