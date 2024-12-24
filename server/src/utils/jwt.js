import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const createToken = (payload, expiresIn = '8h') =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

export default createToken;
