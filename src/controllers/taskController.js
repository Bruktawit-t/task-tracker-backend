import Task from '../models/taskModel.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const newTask = await Task.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await Task.deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
