import Task from '../models/task.model.js';

export const getTasks = (req, res) => {};

export const getTask = (req, res) => {};

export const addTask = (req, res) => {
  console.log(req.body);
  console.log(req.user.id);

  const { title, description } = req.body;

  const newTask = new Task({
    title,
    description,
    user: req.user.id,
  });

  newTask.save();
  console.log(newTask);
};

export const deleteTask = (req, res) => {};

export const updateTaks = (req, res) => {};
