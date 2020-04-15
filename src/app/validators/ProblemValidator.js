import * as Yup from 'yup';

export const problemSchema = Yup.object().shape({
  description: Yup.string().required(),
});
