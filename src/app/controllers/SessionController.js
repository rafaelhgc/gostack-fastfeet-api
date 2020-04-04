import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import SecurityConfig from '../../config/SecurityConfig';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.send(400, { errors: 'Validation Error' });
    }

    const { email, password } = req.body || {};
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      return res.send(400, { errors: 'E-mail or password invalids.' });
    }

    const { id, name } = user;

    return res.json({
      id,
      name,
      token: jwt.sign({ id }, SecurityConfig.SECRET_KEY, {
        expiresIn: SecurityConfig.EXPIRES_IN,
      }),
    });
  }
}

export default new SessionController();
