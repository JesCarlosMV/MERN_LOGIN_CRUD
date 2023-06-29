import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTaks,
} from '../controllers/tasks.controller.js';

const router = Router(); // router de las rutas de las tareas, para usarlo en el server

router.post('/tasks', validateToken, createTask); // insertar tarea
router.get('/tasks', validateToken, getTasks); // ver todas las tareas
router.get('/tasks/:id', validateToken, getTask); //ver solo una tarea por id
router.delete('/tasks/:id', validateToken, deleteTask); // eliminar tarea por id
router.put('/tasks/:id', validateToken, updateTaks); // modificar una tarea por id

export default router;
