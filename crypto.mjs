import { randomBytes } from 'crypto';

const generateRandomKey = (length) => {
  return randomBytes(length).toString('hex');
};

const jwtSecretKey = generateRandomKey(32);
console.log('JWT Secret Key:', jwtSecretKey);
