import jwt from 'jsonwebtoken';

import User from '../models/User';
import SecurityConfig from '../../config/SecurityConfig';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body || {};
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      return res.status(400).send({ errors: 'E-mail or password invalids.' });
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
