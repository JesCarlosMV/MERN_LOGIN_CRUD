import jwt from 'jsonwebtoken';
import { KEYTOKEN } from '../libs/auxJwt.js';

export const validateToken = (req, res, next) => {
  console.log('\tValidando Token..\n');

  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({
      msg: 'No hay token, ACCESO DENEGADO DESDE validaeToken middleware',
    });

  const decoded = jwt.verify(token, KEYTOKEN);
  req.user = decoded;

  console.log('\tVoken validado en validateToken middleware :D \n');

  next();
};
