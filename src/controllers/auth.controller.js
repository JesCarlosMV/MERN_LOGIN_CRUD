/* TODAS LAS FUNCIONES FUNCIONAN CON EMAIL PORQUE ES UNICO 

  1º se desestructura el req.body para obtener los datos que se envian desde el cliente 
  2º se comprueba que los campos existan 
  3º se comprueba que el email en la bbdd
  4º se procede a hacer lo que se quiere 
  
  Nota : el body de la peticion de POST_login tiene que ser de tipo x-www-form-urlencoded EN POSTMAN para que funcione , NO PUEDE SER DE TIPO JSON
  */

import User from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { KEYTOKEN } from '../libs/auxJwt.js';

export const POST_register = (req, res) => {
  const { nick, email, password } = req.body;

  if (!nick || !email || !password)
    return res.status(400).json({ msg: 'Please, send all fields' });

  User.find({ email: email }).then(async (user) => {
    if (user.length > 0) {
      return res.status(400).json({ msg: 'The email already exists' });
    } else {
      const newUser = new User({
        nick,
        email,
        password: await bcrypt.hash(password, 10), // encriptamos la contraseña
      });

      newUser.save();

      const token = jwt.sign({ id: newUser._id }, KEYTOKEN, {
        // creamos el token con el id del usuario
        expiresIn: 3600,
      });

      res.cookie(token, 'token'); // guardamos el token en una cookie para que el cliente lo pueda usar

      res.send('user saved \n' + newUser);
    }
  });
};

export const DELETE_register = (req, res) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ msg: 'Please, send me the email for delete' });

  User.find({ email: email }).then((user) => {
    if (user.length > 0) {
      User.deleteOne({ email: email }).then(() => {
        res.send('User deleted');
      });
    } else {
      return res.status(400).json({ msg: 'The email does not exists' });
    }
  });
};

export const POST_login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'No has enviado o email o pass :(' });

  User.find({ email: email }).then(async (user) => {
    if (user.length === 0) {
      return res.status(400).json({ msg: 'El email NO se encuentra :(' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password); // comparamos la contraseña encriptada con la que nos envia el cliente

    if (!isMatch) return res.status(400).json({ msg: 'Pass NO coincide :(' });

    const token = jwt.sign({ id: user[0]._id }, KEYTOKEN, {
      // creamos el token con el id del usuario
      expiresIn: 3600,
    });

    res.cookie('token', token); // guardamos el token en una cookie para que el cliente lo pueda usar

    res.send('Logueado ! :)');
  });
};

export const POST_logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) }); // borramos la cookie del cliente

  return res.status(200).send('logged out and cookie Token deleted');
};

export const POST_AUTH_profile = async (req, res) => {
  res.send('profile');
};
