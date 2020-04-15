import * as Yup from 'yup';

export const deliverymanSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
});
