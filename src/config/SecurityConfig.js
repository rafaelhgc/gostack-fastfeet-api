import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
};
