import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

const store = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(store);

export default bruteForce;
