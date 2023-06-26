/* TODAS LAS RUTAS FUNCIONAN CON EMAIL PORQUE ES UNICO 

  1º se desestructura el req.body para obtener los datos que se envian desde el cliente 
  2º se comprueba que los campos existan 
  3º se comprueba que el email en la bbdd
  4º se procede a hacer lo que se quiere */

import User from '../models/users.model.js';
import bcrypt from 'bcryptjs';

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
        password: await bcrypt.genSalt(10), // encriptamos la contraseña
      });
      newUser.save();
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
  res.send('login');
};
