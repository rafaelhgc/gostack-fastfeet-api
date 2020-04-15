import * as Yup from 'yup';

export const recipientSchema = Yup.object().shape({
  name: Yup.string().required(),
  street_address: Yup.string().required(),
  number: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  zip_code: Yup.string().required(),
});
