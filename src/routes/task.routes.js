import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';

const router = Router(); // router de las rutas de las tareas, para usarlo en el server

router.post('/tasks'), validateToken, (req, (res) => {}); // insertar tarea
router.get('/tasks', validateToken, (req, res) => {}); // ver todas las tareas
router.get('tasks/:id', validateToken, (req, res) => {}); //ver solo una tarea por id
router.delete('/tasks/id:'), validateToken(req, (res) => {}); // eliminar tarea por id
router.put('/tasks/:id'), validateToken, (req, (res) => {}); // modificar una tarea por id

export default router;
