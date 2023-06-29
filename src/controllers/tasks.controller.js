// IMPORTANTE => ASYNC AWAIT PARA TRABAJAR CON LAS PROMESAS DE MONGOOSE EN LA BD
import Task from '../models/task.model.js';

export const getTasks = (req, res) => {};

export const getTask = async (req, res) => {
  const { id } = req.params;

  const taskFound = await Task.findById(id);

  if (!taskFound)
    return res.status(404).json({ message: 'No se encuentra la tarea :(' });

  return res.status(200).json({ taskFound });
};

export const createTask = (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

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

export const updateTaks = (req, res) => {};
