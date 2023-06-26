import { Router } from 'express';
import {
  POST_register,
  POST_login,
  DELETE_register,
} from '../controllers/auth.controller.js';

export const router = Router(); // creamos el router para las rutas de la app y lo exportamos para usarlo en el server

router.post('/register', POST_register);
router.post('/login', POST_login);

router.delete('/register', DELETE_register);
