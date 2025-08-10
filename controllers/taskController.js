import db from '../db.js';

export const getTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.userId]);
    res.json(tasks);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    await db.query(
      'INSERT INTO tasks (title, description, completed, user_id) VALUES (?, ?, ?, ?)',
      [title, description, completed || false, req.user.userId]
    );
    res.status(201).json({ message: 'Task created' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?',
      [title, description, completed, id, req.user.userId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.userId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
