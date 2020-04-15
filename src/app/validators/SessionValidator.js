import * as Yup from 'yup';

export const sessionSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});
