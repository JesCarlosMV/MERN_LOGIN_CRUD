/* IMPORTANTE => ASYNC AWAIT PARA TRABAJAR CON LAS PROMESAS DE MONGOOSE EN LA BD

- getTasks: Obtiene todas las tareas de DE UN USUARIO 
                             ( id del usuario en el token => req.user.id )
- getTask: Obtiene una tarea por id      ( id de la tarea => req.params )
- createTask: Crea una tarea         ( title, description => req.body )
- deleteTask: Elimina una tarea por id   ( id de la tarea => req.params )
- updateTaks: Actualiza una tarea por id ( id de la tarea => req.params 
                                       title, description => req.body )


 */
import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  const { id } = req.user;
  const listaTareasEntera = await Task.find({
    user: id,
  });

  if (listaTareasEntera.length == 0)
    return res.status(404).json({
      message: 'No hay tareas para mostrar :(',
    });

  return res.status(200).json(listaTareasEntera);
};

export const get_1_Task = async (req, res) => {
  const { id } = req.params;

  const taskFound = await Task.findById(id);

  if (!taskFound)
    return res.status(404).json({ message: 'No se encuentra la tarea :(' });

  return res.status(200).json({ taskFound });
};

export const createTask = (req, res) => {
  const { title, description } = req.body;
  const { id } = req.user;

  if (!title || !description)
    return res
      .status(400)
      .json({ message: 'Te falta o titulo o descripcion de la tarea :(' });

  const newTask = new Task({
    title,
    description,
    user: id,
  });

  newTask.save();

  return res.status(201).json({
    message: 'Tarea creada! :D',
    newTask,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task)
    return res
      .status(404)
      .json({ message: 'Tarea no encontrada para borrar :(' });

  return res.status(200).json({ message: 'Tarea Borrada! :D ' });
};

export const updateTaks = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description)
    return res
      .status(400)
      .json({ message: 'Te falta o titulo o descripcion de la tarea :(' });

  const taskUpdated = await Task.findByIdAndUpdate(
    id,

    {
      title,
      description,
    },
    { new: true }
  );

  if (!taskUpdated)
    return res
      .status(404)
      .json({ message: 'Tarea no encontrada para actualizar :(' });

  return res.status(200).json({ message: 'Tarea Actualizada! :D ' });
};
