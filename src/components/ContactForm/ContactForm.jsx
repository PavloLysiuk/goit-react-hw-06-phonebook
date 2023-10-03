import { Title, FormInput, ErrorMsg, AddButton } from './ContactForm.styled';
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

export const ContactForm = ({ title, onAdd }) => {
  return (
    <div>
      {title && <Title>{title}</Title>}

      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={SubmitSchema}
        onSubmit={(values, actions) => {
          onAdd(values);
          actions.resetForm();
        }}
      >
        <Form>
          <FormInput
            type="text"
            name="name"
            placeholder="Full Name (Example: Pavlo Lysiuk)"
          />
          <ErrorMsg name="name" component="p" />
          <FormInput
            type="tel"
            name="number"
            placeholder="Phone number (Example: XXXXXXX)"
          />
          <ErrorMsg name="number" component="p" />
          <AddButton type="submit">Add contact</AddButton>
        </Form>
      </Formik>
    </div>
  );
};
