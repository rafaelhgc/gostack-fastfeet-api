import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import SecurityConfig from '../../config/SecurityConfig';

export default async (req, res, next) => {
  const header = req.header('Authorization');

  if (!header || !header.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = header.substring(7);

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      SecurityConfig.SECRET_KEY
    );
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
