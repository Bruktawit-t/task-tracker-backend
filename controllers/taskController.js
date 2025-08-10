import {
  getAllTasksByUser,
  createTask,
  updateTask,
  deleteTask,
} from '../models/taskmodel.js';

export const fetchTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await getAllTasksByUser(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const addTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const task = req.body;
    task.userId = userId;
    const id = await createTask(task);
    res.status(201).json({ id, ...task });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

export const editTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const task = req.body;
    const updated = await updateTask(id, userId, task);
    if (updated) {
      res.json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const removeTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const deleted = await deleteTask(id, userId);
    if (deleted) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
