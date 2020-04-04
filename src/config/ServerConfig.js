import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
};
