import jwt from 'jsonwebtoken';
import { KEYTOKEN } from '../libs/auxJwt.js';

export const validateToken = (req, res, next) => {
  console.log('\tValidating token..\n');
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  const decoded = jwt.verify(token, KEYTOKEN);
  req.user = decoded;

  console.log('\tToken validated in validateToken.js Middleware\n');

  next();
};
