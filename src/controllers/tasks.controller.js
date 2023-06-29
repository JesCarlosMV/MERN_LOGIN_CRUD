// IMPORTANTE => ASYNC AWAIT PARA TRABAJAR CON LAS PROMESAS DE MONGOOSE EN LA BD
import Task from '../models/task.model.js';

export const getTasks = (req, res) => {};

export const getTask = async (req, res) => {
  const { id } = req.params;

  const taskFound = await Task.findById(id);

  if (!taskFound) return res.status(404).json({ message: 'Task not found' });

  return res.status(200).json({ taskFound });
};

export const addTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description)
    return res
      .status(400)
      .json({ message: 'Te falta o titulo o descripcion de la tarea' });

  const newTask = new Task({
    title,
    description,
    user: req.user.id,
  });

  newTask.save();

  return res.status(201).json({
    message: 'Task created successfully',
    newTask,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  return res.status(200).json({ message: 'Task deleted successfully' });
};

export const updateTaks = (req, res) => {};
