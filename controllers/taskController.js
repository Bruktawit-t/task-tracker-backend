import db from '../db.js';

// Get all tasks for logged-in user
export const fetchTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [tasks] = await db.execute(
      'SELECT * FROM tasks WHERE userId = ? ORDER BY id ASC',
      [userId]
    );

    const normalized = tasks.map(t => ({
      ...t,
      completed: t.completed === 1
    }));

    res.json(normalized);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Add new task
export const addTask = async (req, res) => {
  const userId = req.user.userId;
  const { title, description, due_date, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ message: 'Title and Priority are required' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO tasks (userId, title, description, due_date, priority, completed) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description, due_date, priority, 0]
    );

    res.status(201).json({
      id: result.insertId,
      userId,
      title,
      description,
      due_date,
      priority,
      completed: false
    });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, description, due_date, priority, completed } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ message: 'Title and Priority are required' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, completed = ? WHERE id = ? AND userId = ?',
      [title, description, due_date, priority, completed ? 1 : 0, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ id, userId, title, description, due_date, priority, completed });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM tasks WHERE id = ? AND userId = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
