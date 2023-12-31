import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {
  POST_register,
  POST_login,
  DELETE_register,
  POST_logout,
  POST_AUTH_profile,
} from '../controllers/auth.controller.js';

const router = Router(); // router para las rutas de la app y lo exportamos para usarlo en el server

router.post('/register', POST_register);
router.post('/login', POST_login);
router.post('/logout', POST_logout);
router.post('/profile', validateToken, POST_AUTH_profile);
router.delete('/register', DELETE_register);

export default router;
