import * as Yup from 'yup';

export const deliverySchema = Yup.object().shape({
  description: Yup.string().required(),
});
