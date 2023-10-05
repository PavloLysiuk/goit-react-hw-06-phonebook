export const formatContactNumber = contact => {
  let newContact;
  if (contact.replace(/\D+/g, '').length === 12) {
    newContact = contact
      .replace(/\D+/g, '')
      .replace(/^(\d{3})(\d{2})(\d{3})(\d{4}).*/, '+$1 $2 $3 $4');
  } else if (contact.replace(/\D+/g, '').length === 11) {
    newContact = contact
      .replace(/\D+/g, '')
      .replace(/^(\d{2})(\d{2})(\d{3})(\d{4}).*/, '+$1 $2 $3 $4');
  } else if (contact.replace(/\D+/g, '').length === 10) {
    newContact = contact
      .replace(/\D+/g, '')
      .replace(/^(\d{1})(\d{2})(\d{3})(\d{4}).*/, '$1 $2 $3 $4');
  } else if (contact.replace(/\D+/g, '').length === 9) {
    newContact = contact
      .replace(/\D+/g, '')
      .replace(/^(\d{2})(\d{3})(\d{4}).*/, '$1 $2 $3');
  } else {
    newContact = contact
      .replace(/\D+/g, '-')
      .replace(/^(\d{3})(\d{4}).*/, '$1 $2');
  }
  return newContact;
};
